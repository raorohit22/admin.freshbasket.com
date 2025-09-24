#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

// Admin system test cases mapping
const adminTestCases = {
    'ADM-01': 'Admin Login - Enter valid credentials → Access dashboard',
    'ADM-02': 'Product Management - Add/Edit/Delete product → Save → Refresh Store',
    'ADM-03': 'Order Management - Open orders list → Update status to Shipped/Delivered',
    'ADM-04': 'User Management - View registered users → Block/Unblock user',
    'ADM-05': 'Security Role Check - Try accessing admin features without login',
    'ADM-06': 'Analytics / Reports - Generate sales report'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function logHeader(message) {
    log(`\n${colors.bright}${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    log(`${colors.bright}${colors.cyan}${message}${colors.reset}`);
    log(`${colors.bright}${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

function logTestHeader(testCase) {
    log(`\n${colors.bright}${colors.blue}Admin Dashboard - ${testCase}${colors.reset}`);
    log(`${colors.yellow}${'─'.repeat(50)}${colors.reset}`);
}

function runCommand(command, description) {
    try {
        log(`Running: ${description}`, colors.yellow);
        const output = execSync(command, {
            encoding: 'utf8',
            stdio: 'pipe'
        });
        return { success: true, output };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            output: error.stdout || error.stderr || ''
        };
    }
}

function runAdminSystemTests() {
    logHeader('FRESHBASKET ADMIN DASHBOARD SYSTEM TESTS');

    // Check if we're in the admin directory
    if (!fs.existsSync('./package.json')) {
        log('Error: Must be run from the admin directory', colors.red);
        process.exit(1);
    }

    // Check if node_modules exists
    if (!fs.existsSync('./node_modules')) {
        log('Installing dependencies...', colors.yellow);
        try {
            execSync('npm install', { stdio: 'inherit' });
        } catch (error) {
            log('Failed to install dependencies', colors.red);
            process.exit(1);
        }
    }

    // Run all admin system tests
    const result = runCommand('npm run test:system', 'Admin System Tests');

    if (result.success) {
        log(`✅ All admin system tests passed`, colors.green);
        return { success: true, output: result.output };
    } else {
        log(`❌ Admin system tests failed`, colors.red);
        log(`Error: ${result.error}`, colors.red);
        if (result.output) {
            log(`Output: ${result.output}`, colors.yellow);
        }
        return { success: false, error: result.error, output: result.output };
    }
}

function runAllAdminTests() {
    return runAdminSystemTests();
}

function runSpecificTest(testCaseId) {
    if (!adminTestCases[testCaseId]) {
        log(`Unknown test case: ${testCaseId}`, colors.red);
        log(`Available test cases: ${Object.keys(adminTestCases).join(', ')}`, colors.yellow);
        return;
    }

    logHeader(`Running Specific Test: ${testCaseId}`);
    log(`Test Description: ${adminTestCases[testCaseId]}`, colors.yellow);

    const results = runAdminSystemTests([testCaseId]);
    return results;
}

function generateReport(results) {
    const timestamp = new Date().toISOString();
    const reportPath = `./admin-system-test-report-${timestamp.split('T')[0]}.json`;

    const report = {
        timestamp,
        component: 'Admin Dashboard',
        summary: {
            total: results.total,
            passed: results.passed,
            failed: results.failed,
            successRate: results.total > 0 ? (results.passed / results.total * 100).toFixed(2) + '%' : '0%'
        },
        testCases: results.testCases,
        testCaseDescriptions: adminTestCases
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`\nReport generated: ${reportPath}`, colors.green);

    return reportPath;
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'all':
        case 'run':
        default:
            const results = runAllAdminTests();
            generateReport(results);
            process.exit(results.success ? 0 : 1);
            break;

        case 'list':
            logHeader('Available Admin System Test Cases');
            for (const [testId, description] of Object.entries(adminTestCases)) {
                log(`${colors.cyan}${testId}: ${description}${colors.reset}`);
            }
            break;

        case 'help':
            logHeader('FreshBasket Admin System Test Runner');
            log('Usage: node admin-system-test-runner.cjs [command]');
            log('');
            log('Commands:');
            log('  run, all               Run all admin system tests (default)');
            log('  list                   List all available test cases');
            log('  help                   Show this help message');
            log('');
            log('Examples:');
            log('  node admin-system-test-runner.cjs');
            log('  node admin-system-test-runner.cjs run');
            log('  node admin-system-test-runner.cjs list');
            break;
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    runAdminSystemTests,
    runSpecificTest,
    generateReport,
    adminTestCases
};
