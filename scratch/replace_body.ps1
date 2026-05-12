$files = "public/index.html", "public/index1.html", "public/routes.html"

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace 'background:\s*var\(--white\);\s*color:\s*var\(--ink\);', 'background: #121212; color: #f5f5f5;'
        
        # also check routes.html specifically
        $content = $content -replace 'background:\s*var\(--off\);\s*color:\s*var\(--navy-xl\);', 'background: #121212; color: #f5f5f5;'
        
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "Updated $file"
    }
}
