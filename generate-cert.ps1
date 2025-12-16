# Script pour générer des certificats SSL auto-signés pour le développement local

# Créer le dossier cert s'il n'existe pas
if (!(Test-Path -Path "cert")) {
    New-Item -ItemType Directory -Path "cert" -Force
    Write-Host "✓ Dossier cert/ créé" -ForegroundColor Green
}

# Vérifier si OpenSSL est disponible
$opensslPath = Get-Command openssl -ErrorAction SilentlyContinue

if ($opensslPath) {
    Write-Host "🔐 Génération des certificats SSL avec OpenSSL..." -ForegroundColor Cyan
    
    # Générer le certificat avec OpenSSL
    openssl req -x509 -newkey rsa:4096 `
        -keyout cert/server.key `
        -out cert/server.cert `
        -days 365 `
        -nodes `
        -subj "/C=CA/ST=Quebec/L=Montreal/O=GreenHand/CN=localhost"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Certificats générés avec succès!" -ForegroundColor Green
        Write-Host "  - cert/server.key" -ForegroundColor Gray
        Write-Host "  - cert/server.cert" -ForegroundColor Gray
    } else {
        Write-Host "✗ Erreur lors de la génération" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️  OpenSSL n'est pas installé" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Solutions:" -ForegroundColor Cyan
    Write-Host "1. Installer OpenSSL:"
    Write-Host "   - Télécharger: https://slproweb.com/products/Win32OpenSSL.html"
    Write-Host "   - Ou via Chocolatey: choco install openssl"
    Write-Host ""
    Write-Host "2. Utiliser un certificat auto-signé PowerShell (moins compatible):"
    Write-Host "   New-SelfSignedCertificate -DnsName 'localhost' -CertStoreLocation 'cert:\CurrentUser\My'"
    exit 1
}
