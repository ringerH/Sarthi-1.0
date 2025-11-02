Write-Host "Sarthi - Marketplace Service Demo" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# Define Service URLs
$authServiceUrl = "http://localhost:5002"
$marketplaceServiceUrl = "http://localhost:5000"

# 1. Test Marketplace Service Health
Write-Host "`n1. Testing Marketplace Service Health..." -ForegroundColor Yellow
try {
    $health = irm -Uri "$marketplaceServiceUrl/health" -Method Get
    Write-Host "   Service Status: $($health.status)" -ForegroundColor Green
    Write-Host "   Service: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "   Marketplace Service not available at $marketplaceServiceUrl" -ForegroundColor Red
    Write-Host "   Please ensure the Marketplace Service is running." -ForegroundColor Red
    exit
}

# 2. Authenticate with Auth-Service (to get token)
Write-Host "`n2. Authenticating with Auth-Service to get token..." -ForegroundColor Yellow
$token = $null
$loginBody = @{
    email = "demo@campus.edu"
    password = "demopass123"
} | ConvertTo-Json

try {
    $loginResponse = irm -Method Post -Uri "$authServiceUrl/api/auth/login" -ContentType "application/json" -Body $loginBody
    $token = $loginResponse.token
    if ($null -eq $token) { throw "Token was null" }
    Write-Host "   Successfully fetched authentication token!" -ForegroundColor Green
} catch {
    Write-Host "   Login failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please ensure the Auth-Service is running on port 5002." -ForegroundColor Red
    exit
}

# Define Authorization Headers for Marketplace
$headers = @{
    "Authorization" = "Bearer $token"
}

# 3. Test Public Route (Get All Listings)
Write-Host "`n3. Testing Public Route (GET /api/listings)..." -ForegroundColor Yellow
try {
    $allListings = irm -Method Get -Uri "$marketplaceServiceUrl/api/listings" -Headers $headers
    Write-Host "   Success! Found $($allListings.listings.Count) total listings." -ForegroundColor Green
} catch {
    Write-Host "   Failed to get listings: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 4. Test Protected Route (Create New Listing)
Write-Host "`n4. Testing Protected Route (POST /api/listings)..." -ForegroundColor Yellow
$newListingBody = @{
    title = "Demo Test Listing"
    description = "This is a test listing created by a demo script."
    price = 99.99
    category = "electronics"
    condition = "good"
    contactInfo = @{
        phone = "1234567890"
        room = "B-101"
        hostel = "Demo Hostel"
    }
} | ConvertTo-Json

try {
    $createResponse = irm -Method Post -Uri "$marketplaceServiceUrl/api/listings" -Headers $headers -ContentType "application/json" -Body $newListingBody
    Write-Host "   Success! Created listing: $($createResponse.listing.title)" -ForegroundColor Green
} catch {
    Write-Host "   Failed to create listing: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 5. Test Protected Route (Get My Listings)
Write-Host "`n5. Testing Protected Route (GET /api/listings/my-listings)..." -ForegroundColor Yellow
try {
    $myListings = irm -Method Get -Uri "$marketplaceServiceUrl/api/listings/my-listings" -Headers $headers
    Write-Host "   Success! Found $($myListings.listings.Count) user-specific listing(s)." -ForegroundColor Green
} catch {
    Write-Host "   Failed to get 'my-listings': $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Demo Complete
Write-Host "`nDEMO COMPLETE! All Marketplace Service tests passed successfully!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Cyan