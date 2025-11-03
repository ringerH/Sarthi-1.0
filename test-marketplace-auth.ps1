
Write-Host "Starting Marketplace Service Smoke Test with Authentication..." -ForegroundColor Cyan

# CONFIGURATION

$baseUrl = "http://localhost:5000"

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDg1ZGZlZjU0M2E2NjEwOGYzMDZmMCIsImVtYWlsIjoic3R1ZGVudDJAY2FtcHVzLmVkdSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzYyMTU2MDMwLCJleHAiOjE3NjQ3NDgwMzB9.HiqL4TSdobMxZsoko2EQ8XZyKMHrcCM5FLW7M1Ghauo"

# headers
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}


# TEST 1: Health Check (No Auth Required)
Write-Host "`n[TEST 1] Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = irm "$baseUrl/health"
    Write-Host "SUCCESS: Health Check - Status: $($health.status)" -ForegroundColor Green
    Write-Host "         Timestamp: $($health.timestamp)"
} catch {
    Write-Host "FAILED: Health Check - $_" -ForegroundColor Red
}

# TEST 2: Root Endpoint (No Auth Required)
Write-Host "`n[TEST 2] Testing Root Endpoint..." -ForegroundColor Yellow
try {
    $root = irm "$baseUrl/"
    Write-Host "SUCCESS: Root Endpoint - $($root.message)" -ForegroundColor Green
    Write-Host "         Version: $($root.version)"
} catch {
    Write-Host "FAILED: Root Endpoint - $_" -ForegroundColor Red
}

# TEST 3: Get All Listings (Auth Required)

Write-Host "`n[TEST 3] Testing GET All Listings..." -ForegroundColor Yellow
try {
    $listings = irm "$baseUrl/api/listings" -Headers $headers
    Write-Host "SUCCESS: Found $($listings.listings.Count) listings" -ForegroundColor Green
    if ($listings.listings.Count -gt 0) {
        Write-Host "         First listing: $($listings.listings[0].title)"
    }
    # Store first listing ID for later tests
    $testListingId = $listings.listings[0]._id
} catch {
    Write-Host "FAILED: Get All Listings - $_" -ForegroundColor Red
    Write-Host "         Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
}


# TEST 4: Create New Listing (Auth Required)
Write-Host "`n[TEST 4] Testing CREATE Listing..." -ForegroundColor Yellow
$newListing = @{
    title = "Smoke Test Item"
    description = "This is a test listing created by smoke test"
    price = 999
    category = "electronics"
    condition = "good"
    images = @()
    contactInfo = @{
        phone = "9876543210"
        room = "101"
        hostel = "Test Hostel"
    }
} | ConvertTo-Json

try {
    $created = irm "$baseUrl/api/listings" -Method Post -Headers $headers -Body $newListing
    Write-Host "SUCCESS: Created listing with ID: $($created.listing._id)" -ForegroundColor Green
    Write-Host "         Title: $($created.listing.title)"
    Write-Host "         Price: Rs.$($created.listing.price)"
    $createdListingId = $created.listing._id
} catch {
    Write-Host "FAILED: Create Listing - $_" -ForegroundColor Red
}

# TEST 5: Get Specific Listing (Auth Required)
if ($createdListingId) {
    Write-Host "`n[TEST 5] Testing GET Specific Listing..." -ForegroundColor Yellow
    try {
        $specific = irm "$baseUrl/api/listings/$createdListingId" -Headers $headers
        Write-Host "SUCCESS: Retrieved listing: $($specific.listing.title)" -ForegroundColor Green
        Write-Host "         Status: $($specific.listing.status)"
    } catch {
        Write-Host "FAILED: Get Specific Listing - $_" -ForegroundColor Red
    }
}


# TEST 6: Update Listing (Auth Required)
if ($createdListingId) {
    Write-Host "`n[TEST 6] Testing UPDATE Listing..." -ForegroundColor Yellow
    $updateData = @{
        title = "Updated Smoke Test Item"
        description = "This listing has been updated"
        price = 1299
        category = "electronics"
        condition = "like-new"
        images = @()
        contactInfo = @{
            phone = "9876543210"
            room = "102"
            hostel = "Updated Hostel"
        }
    } | ConvertTo-Json

    try {
        $updated = irm "$baseUrl/api/listings/$createdListingId" -Method Put -Headers $headers -Body $updateData
        Write-Host "SUCCESS: Updated listing" -ForegroundColor Green
        Write-Host "         New Title: $($updated.listing.title)"
        Write-Host "         New Price: Rs.$($updated.listing.price)"
    } catch {
        Write-Host "FAILED: Update Listing - $_" -ForegroundColor Red
    }
}

# TEST 7: Get My Listings (Auth Required)
Write-Host "`n[TEST 7] Testing GET My Listings..." -ForegroundColor Yellow
try {
    $myListings = irm "$baseUrl/api/listings/my-listings" -Headers $headers
    Write-Host "SUCCESS: Found $($myListings.listings.Count) of your listings" -ForegroundColor Green
} catch {
    Write-Host "FAILED: Get My Listings - $_" -ForegroundColor Red
}

# TEST 8: Delete Listing (Auth Required)
if ($createdListingId) {
    Write-Host "`n[TEST 8] Testing DELETE Listing..." -ForegroundColor Yellow
    try {
        $deleted = irm "$baseUrl/api/listings/$createdListingId" -Method Delete -Headers $headers
        Write-Host "SUCCESS: Deleted listing - $($deleted.message)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED: Delete Listing - $_" -ForegroundColor Red
    }
}


# TEST 9: Test Invalid Token
Write-Host "`n[TEST 9] Testing Invalid Token (Should Fail)..." -ForegroundColor Yellow
$badHeaders = @{
    "Authorization" = "Bearer invalid_token_123"
    "Content-Type" = "application/json"
}
try {
    $result = irm "$baseUrl/api/listings" -Headers $badHeaders
    Write-Host "UNEXPECTED: Request succeeded with invalid token" -ForegroundColor Red
} catch {
    Write-Host "SUCCESS: Invalid token correctly rejected (401)" -ForegroundColor Green
}

# SUMMARY
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Smoke Test Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nNote: In case of failure, we check:" -ForegroundColor Yellow
Write-Host "  1. Server is running on port 5000"
Write-Host "  2. JWT token is valid and not expired"
Write-Host "  3. MongoDB is connected"