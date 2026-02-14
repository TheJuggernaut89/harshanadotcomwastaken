$targetDir = "public\images\journey\cream-of-creams\images"
if (Test-Path $targetDir) {
    Write-Host "Processing directory: $targetDir"
    $files = Get-ChildItem -Path $targetDir -Filter "*.png" | Sort-Object Name
    $i = 1
    foreach ($file in $files) {
        $newName = "cream-$i.png"
        $newPath = Join-Path $targetDir $newName
        
        if ($file.Name -ne $newName) {
            # Check if target exists to avoid collision
            if (Test-Path $newPath) {
                Write-Warning "Target file $newName already exists. Skipping."
            } else {
                Rename-Item -Path $file.FullName -NewName $newName
                Write-Host "Renamed '$($file.Name)' to '$newName'"
            }
        } else {
            Write-Host "Skipping '$($file.Name)' (already correctly named)"
        }
        $i++
    }
} else {
    Write-Error "Directory $targetDir not found. Ensure you are in the project root."
}
