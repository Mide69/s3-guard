from __future__ import annotations

import json as jsonlib
from typing import Optional

import typer
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

from . import __version__
from .auditor import audit, make_client
from .checks import SEVERITY_ORDER, Finding

app = typer.Typer(
    add_completion=False,
    help="s3-guard — scan your S3 buckets for security misconfigurations.",
)
console = Console()

SEVERITY_STYLE = {
    "CRITICAL": "bold white on red",
    "HIGH": "bold red",
    "MEDIUM": "yellow",
    "LOW": "cyan",
}


def _severity_badge(severity: str) -> Text:
    return Text(f" {severity} ", style=SEVERITY_STYLE.get(severity, "white"))


def _render_table(findings: list[Finding]) -> Table:
    table = Table(title="s3-guard findings", header_style="bold magenta", expand=True)
    table.add_column("Severity", no_wrap=True)
    table.add_column("Bucket", style="bold", no_wrap=True)
    table.add_column("Check", no_wrap=True)
    table.add_column("Problem")
    for f in findings:
        table.add_row(
            _severity_badge(f.severity),
            f.bucket,
            f.check,
            f.message,
        )
    return table


def _summary_line(findings: list[Finding]) -> str:
    counts = {}
    for f in findings:
        counts[f.severity] = counts.get(f.severity, 0) + 1
    parts = [
        f"{counts[sev]} {sev.lower()}"
        for sev in ("CRITICAL", "HIGH", "MEDIUM", "LOW")
        if sev in counts
    ]
    return ", ".join(parts) if parts else "no issues"


def _version_callback(value: bool):
    if value:
        console.print(f"s3-guard {__version__}")
        raise typer.Exit()


@app.callback()
def _root():
    """s3-guard — scan your S3 buckets for security misconfigurations."""
    # Presence of a callback keeps `scan` as an explicit subcommand.


@app.command()
def scan(
    endpoint_url: Optional[str] = typer.Option(
        None,
        "--endpoint-url",
        help="Custom S3 endpoint (e.g. http://localhost:5000 for moto/LocalStack).",
    ),
    region: str = typer.Option("us-east-1", "--region", help="AWS region."),
    profile: Optional[str] = typer.Option(
        None, "--profile", help="Named AWS profile to use."
    ),
    bucket: Optional[list[str]] = typer.Option(
        None, "--bucket", "-b", help="Scan only these bucket(s). Repeatable."
    ),
    output_json: bool = typer.Option(
        False, "--json", help="Emit findings as JSON instead of a table."
    ),
    fail_level: str = typer.Option(
        "HIGH",
        "--fail-level",
        help="Exit non-zero if any finding is at or above this severity "
        "(LOW|MEDIUM|HIGH|CRITICAL). Great for CI pipelines.",
    ),
    version: Optional[bool] = typer.Option(
        None, "--version", callback=_version_callback, is_eager=True,
        help="Show version and exit."
    ),
):
    """Scan S3 buckets and report security misconfigurations."""
    client = make_client(endpoint_url=endpoint_url, region=region, profile=profile)

    try:
        findings = audit(client, buckets=bucket)
    except Exception as error:  # noqa: BLE001 — friendly top-level error for a CLI
        console.print(f"[bold red]Error:[/] {error}")
        raise typer.Exit(code=2)

    if output_json:
        payload = [f.__dict__ for f in findings]
        console.print_json(jsonlib.dumps(payload))
    else:
        if findings:
            console.print(_render_table(findings))
        summary_style = "bold red" if findings else "bold green"
        console.print(
            Panel(
                f"Scanned and found: {_summary_line(findings)}.",
                style=summary_style,
                title="Summary",
            )
        )

    # Exit non-zero if anything meets the fail threshold — gates CI/CD pipelines.
    threshold = SEVERITY_ORDER.get(fail_level.upper(), SEVERITY_ORDER["HIGH"])
    breached = any(SEVERITY_ORDER.get(f.severity, 0) >= threshold for f in findings)
    raise typer.Exit(code=1 if breached else 0)


def main():
    app()


if __name__ == "__main__":
    main()
