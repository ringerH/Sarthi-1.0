# Smoke Test for Marketplace Service
Write-Host "Starting Marketplace Service Smoke Test..." -ForegroundColor Cyan

# 1. Health Check
Write-Host "`n1. Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = irm http://localhost:5000/health
    Write-Host "Health Check: $($health.status)" -ForegroundColor Green
    Write-Host "   Timestamp: $($health.timestamp)"
} catch {
    Write-Host "Health Check Failed: $_" -ForegroundColor Red
}

# 2. Root Endpoint
Write-Host "`n2. Testing Root Endpoint..." -ForegroundColor Yellow
try {
    $root = irm http://localhost:5000/
    Write-Host "Root Endpoint: $($root.message)" -ForegroundColor Green
    Write-Host "   Version: $($root.version)"
} catch {
    Write-Host "Root Endpoint Failed: $_" -ForegroundColor Red
}

# 3. Listings Endpoint (GET all listings)
Write-Host "`n3. Testing Listings Endpoint..." -ForegroundColor Yellow
try {
    # Note: This requires authentication, so it might return 401
    $listings = irm http://localhost:5000/api/listings
    Write-Host "Listings Endpoint: Found $($listings.listings.Count) listings" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Listings Endpoint requires authentication (expected)" -ForegroundColor Yellow
    } else {
        Write-Host "Listings Endpoint Failed: $_" -ForegroundColor Red
    }
}

Write-Host "`nSmoke Test Complete!" -ForegroundColor Cyan