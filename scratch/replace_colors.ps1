$replacements = @{
    '#0d1f2d' = '#121212'
    '#1a3345' = '#1e1e1e'
    '#1c2b36' = '#161616'
    '#060d18' = '#121212'
    '#0c1d32' = '#1a1a1a'
    '#1e2d3d' = '#262626'
    '#2c4257' = '#333333'
    '#070c11' = '#121212'
    '#0d1620' = '#1a1a1a'
    '#0d1b1e' = '#121212'
    '#1e2e32' = '#1a1a1a'
    '#2c3e42' = '#262626'
    '#1a2533' = '#1e1e1e'
    '#141d29' = '#161616'
    '#1e2e3d' = '#242424'
    '#243342' = '#2a2a2a'
    '#060f17' = '#121212'
    '#111c26' = '#161616'
    '#0d1e2c' = '#161616'
    '#131e2c' = '#181818'
    '#2a3d50' = '#a3a3a3'
    '#4a6278' = '#a3a3a3'
    '#527a90' = '#a3a3a3'
    '#8fa3b8' = '#a3a3a3'
    '#4a5d62' = '#737373'
    '#8a9aaa' = '#a3a3a3'
    '#b0c4d4' = '#d4d4d4'
    'rgba\(13, 31, 45,' = 'rgba(18, 18, 18,'
    'rgba\(6, 13, 24,' = 'rgba(18, 18, 18,'
    'rgba\(13, 13, 13,' = 'rgba(18, 18, 18,'
}

$files = Get-ChildItem -Path public -Include *.html, *.css -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    foreach ($key in $replacements.Keys) {
        $content = $content -replace "(?i)$key", $replacements[$key]
    }
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
