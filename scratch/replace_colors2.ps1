$replacements = @{
    '#0e2233' = '#1e1e1e'
    'rgba\(8, 18, 28, 0\.88\)' = 'rgba(18, 18, 18, 0.88)'
    'rgba\(255, 255, 255, 0\.97\)' = 'rgba(18, 18, 18, 0.97)'
    'rgba\(255, 255, 255, 0\.98\)' = 'rgba(18, 18, 18, 0.98)'
    '#f0faf9' = 'rgba(42, 191, 170, 0.1)'
    '#0d1f2d' = '#f5f5f5' # Need to change text color from previous replacement which made it #121212
}

$files = Get-ChildItem -Path public -Include *.html, *.css -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # Fix the logo color that was changed to #121212 incorrectly because it was previously #0d1f2d
    # wait, #0d1f2d was used both as background (navy) and as logo color!
    # Let's just fix .nav-logo { color: #121212 } -> color: #f5f5f5
    $content = $content -replace '(?s)\.nav-logo\s*\{[^}]*color:\s*#121212', '.nav-logo { display: inline-flex !important; align-items: center !important; font-family: ''Bebas Neue'', sans-serif !important; font-size: 1.4rem !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: #f5f5f5'
    
    # same for regular css without !important
    $content = $content -replace '(?s)\.nav-logo\s*\{[^}]*color:\s*#121212', '.nav-logo { display: inline-flex; align-items: center; font-family: ''Bebas Neue'', sans-serif; font-size: 1.4rem; letter-spacing: 0.1em; text-transform: uppercase; color: #f5f5f5'

    foreach ($key in $replacements.Keys) {
        $content = $content -replace "(?i)$key", $replacements[$key]
    }
    
    # Let's ensure the nav text doesn't look bad
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
