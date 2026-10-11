<#
.SYNOPSIS
    Copies the portfolio site from this repo into a local clone of DemevengDerrick/maps,
    so https://demevengderrick.github.io/ and https://demevengderrick.github.io/maps/ serve the same page.

.DESCRIPTION
    This repo is the source of truth. The script mirrors index.html, css/, js/, images/brand,
    images/projects, images/archive and the CV PDF. It does NOT touch maps-only files (the large root .jpg/.png maps,
    README, drawio files) and does not copy robots.txt / sitemap.xml: crawlers only read those at
    the domain root, which this repo already serves.

    Nothing is committed or pushed: review with `git -C <maps> status` and commit yourself.

.EXAMPLE
    .\tools\sync-to-maps.ps1 -MapsPath ..\maps
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$MapsPath
)

$ErrorActionPreference = 'Stop'
$src = Split-Path -Parent $PSScriptRoot
$dst = (Resolve-Path $MapsPath).Path

if (-not (Test-Path (Join-Path $dst '.git'))) {
    throw "'$dst' is not a git repository. Point -MapsPath at your local clone of DemevengDerrick/maps."
}

$files = @('index.html', 'CV_Derrick_Demeven_Spatial_Data_Scientist.pdf', '.nojekyll')
$dirs = @('css', 'js', 'images\brand', 'images\projects', 'images\archive')

foreach ($f in $files) {
    Copy-Item -LiteralPath (Join-Path $src $f) -Destination (Join-Path $dst $f) -Force
    Write-Host "copied  $f"
}

foreach ($d in $dirs) {
    $target = Join-Path $dst $d
    # Mirror the folder exactly so deleted/renamed files don't linger in the maps repo.
    if (Test-Path $target) { Remove-Item -LiteralPath $target -Recurse -Force }
    New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
    Copy-Item -LiteralPath (Join-Path $src $d) -Destination $target -Recurse -Force
    Write-Host "mirrored $d\"
}

Write-Host "`nDone. Review the changes with: git -C `"$dst`" status"
