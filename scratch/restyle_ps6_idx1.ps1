$enc = New-Object System.Text.UTF8Encoding $false
$content = [System.IO.File]::ReadAllText("$pwd\public\index1.html", $enc)
$styleStart = $content.IndexOf("<style>`r`n.ps6-wrap")
if ($styleStart -lt 0) { $styleStart = $content.IndexOf("<style>`n.ps6-wrap") }
$styleEnd = $content.IndexOf("</style>", $styleStart) + "</style>".Length
$newBlock = [System.IO.File]::ReadAllText("$pwd\scratch\_ps6block.txt", $enc)
$final = $content.Substring(0, $styleStart) + $newBlock + $content.Substring($styleEnd)
[System.IO.File]::WriteAllText("$pwd\public\index1.html", $final, $enc)
Write-Host "Done index1."
