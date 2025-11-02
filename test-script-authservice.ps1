# Campus Marketplace - Authentication Service Demo Script
Write-Host "Campus Marketplace - Authentication Service Demo" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# 1. Health Check
Write-Host "`n1. Testing Service Health..." -ForegroundColor Yellow
try {
    $health = irm -Uri "http://localhost:5002/health" -Method Get
    Write-Host "   Service Status: $($health.status)" -ForegroundColor Green
    Write-Host "   Service: $($health.service)" -ForegroundColor Green
} catch {
    Write-Host "   Service not available" -ForegroundColor Red
    exit
}

# 2. User Registration
Write-Host "`n2. Testing User Registration..." -ForegroundColor Yellow
$registerBody = @{
    email = "demo@campus.edu"
    password = "demopass123"
    name = "Demo User"
} | ConvertTo-Json

try {
    $registerResponse = irm -Method Post -Uri "http://localhost:5002/api/auth/register" -ContentType "application/json" -Body $registerBody
    Write-Host "   Registration: $($registerResponse.message)" -ForegroundColor Green
    $token = $registerResponse.token
} catch {
    Write-Host "   Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 3. User Login
Write-Host "`n3. Testing User Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "demo@campus.edu"
    password = "demopass123"
} | ConvertTo-Json

try {
    $loginResponse = irm -Method Post -Uri "http://localhost:5002/api/auth/login" -ContentType "application/json" -Body $loginBody
    Write-Host "   Login: $($loginResponse.message)" -ForegroundColor Green
    $token = $loginResponse.token
} catch {
    Write-Host "   Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 4. Token Verification
Write-Host "`n4. Testing Token Verification..." -ForegroundColor Yellow
try {
    $verifyResponse = irm -Method Post -Uri "http://localhost:5002/api/auth/verify" -Headers @{
        "Authorization" = "Bearer $token"
    }
    Write-Host "   Token Valid: $($verifyResponse.valid)" -ForegroundColor Green
    Write-Host "   User: $($verifyResponse.user.email)" -ForegroundColor Green
} catch {
    Write-Host "   Token verification failed" -ForegroundColor Red
    exit
}

# 5. Protected Route
Write-Host "`n5. Testing Protected Route Access..." -ForegroundColor Yellow
try {
    $profileResponse = irm -Method Get -Uri "http://localhost:5002/api/auth/profile" -Headers @{
        "Authorization" = "Bearer $token"
    }
    Write-Host "   Protected Access: SUCCESS" -ForegroundColor Green
    Write-Host "   User Profile: $($profileResponse.user.name) - $($profileResponse.user.email)" -ForegroundColor Green
} catch {
    Write-Host "   Protected access failed" -ForegroundColor Red
    exit
}

# Demo Complete
Write-Host "`nDEMO COMPLETE! All authentication tests passed successfully!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Cyan