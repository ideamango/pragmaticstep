$content = Get-Content -Raw -Path "public\index1.html" -Encoding UTF8
$newContent = Get-Content -Raw -Path "C:\Users\DELL\Desktop\six_capabilities_v3.html" -Encoding UTF8
$startMarker = "  <!-- THREE ROUTES -->"
$endMarker = "  <!-- PROJECT CYCLE -->"

$startIdx = $content.IndexOf($startMarker)
$endIdx = $content.IndexOf($endMarker)

if ($startIdx -ne -1 -and $endIdx -ne -1) {
    $before = $content.Substring(0, $startIdx)
    $after = $content.Substring($endIdx)
    $finalContent = $before + $newContent + "`r`n`r`n" + $after
    # Write using UTF-8 without BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText("$pwd\public\index1.html", $finalContent, $utf8NoBom)
    Write-Host "Replaced in public/index1.html"
} else {
    Write-Host "Markers not found"
}
