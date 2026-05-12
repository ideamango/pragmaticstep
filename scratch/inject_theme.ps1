$files = Get-ChildItem -Path public -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if already injected
    if ($content -notmatch 'theme-overrides\.css') {
        # Inject right before </head>
        $content = $content -replace '</head>', "  <link rel=`"stylesheet`" href=`"theme-overrides.css`">`n</head>"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Injected into $($file.Name)"
    }
}
