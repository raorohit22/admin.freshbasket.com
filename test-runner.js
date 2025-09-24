#!/usr/bin/env node

/**
 * Test Runner Script for FreshBasket Admin
 * 
 * This script provides utilities to run tests with different configurations
 * and generate test reports.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configurations
const testConfigs = {
    unit: {
        pattern: 'src/__tests__/unit/**/*.test.js',
        description: 'Unit Tests (Service Layer)'
    },
    component: {
        pattern: 'src/__tests__/**/*.test.jsx',
        description: 'Component Tests'
    },
    auth: {
        pattern: 'src/__tests__/auth/**/*.test.jsx',
        description: 'Authentication Tests'
    },
    userManagement: {
        pattern: 'src/__tests__/userManagement/**/*.test.jsx',
        description: 'User Management Tests'
    },
    productManagement: {
        pattern: 'src/__tests__/productManagement/**/*.test.jsx',
        description: 'Product Management Tests'
    },
    orderManagement: {
        pattern: 'src/__tests__/orderManagement/**/*.test.jsx',
        description: 'Order Management Tests'
    },
    dashboard: {
        pattern: 'src/__tests__/dashboard/**/*.test.jsx',
        description: 'Dashboard Tests'
    },
    categoryManagement: {
        pattern: 'src/__tests__/categoryManagement/**/*.test.jsx',
        description: 'Category Management Tests'
    }
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function runTests(testType = 'unit', options = {}) {
    const config = testConfigs[testType];
    if (!config) {
        log(`❌ Unknown test type: ${testType}`, 'red');
        log('Available test types:', 'yellow');
        Object.keys(testConfigs).forEach(type => {
            log(`  - ${type}: ${testConfigs[type].description}`, 'cyan');
        });
        process.exit(1);
    }

    log(`\n🚀 Running ${config.description}...`, 'bright');
    log(`Pattern: ${config.pattern}`, 'blue');

    try {
        const command = buildVitestCommand(config.pattern, options);
        log(`Command: ${command}`, 'cyan');

        execSync(command, {
            stdio: 'inherit',
            cwd: process.cwd()
        });

        log(`\n✅ ${config.description} completed successfully!`, 'green');
    } catch (error) {
        log(`\n❌ ${config.description} failed!`, 'red');
        process.exit(1);
    }
}

function buildVitestCommand(pattern, options) {
    let command = 'npx vitest run';

    if (pattern) {
        command += ` --reporter=verbose "${pattern}"`;
    }

    if (options.watch) {
        command = command.replace('run', '');
    }

    if (options.coverage) {
        command += ' --coverage';
    }

    if (options.ui) {
        command += ' --ui';
    }

    return command;
}

function generateTestReport() {
    log('\n📊 Generating Test Report...', 'bright');

    try {
        // Run tests with coverage
        execSync('npx vitest run --coverage --reporter=json --reporter=html', {
            stdio: 'inherit',
            cwd: process.cwd()
        });

        log('✅ Test report generated successfully!', 'green');
        log('📁 Coverage report: coverage/index.html', 'blue');
        log('📁 JSON report: coverage/coverage-final.json', 'blue');
    } catch (error) {
        log('❌ Failed to generate test report!', 'red');
        process.exit(1);
    }
}

function showHelp() {
    log('\n🧪 FreshBasket Admin Test Runner', 'bright');
    log('================================', 'bright');
    log('\nUsage:', 'yellow');
    log('  node test-runner.js [command] [options]', 'cyan');
    log('\nCommands:', 'yellow');
    log('  unit                    Run all unit tests', 'cyan');
    log('  auth                    Run authentication tests', 'cyan');
    log('  userManagement          Run user management tests', 'cyan');
    log('  productManagement       Run product management tests', 'cyan');
    log('  orderManagement         Run order management tests', 'cyan');
    log('  dashboard               Run dashboard tests', 'cyan');
    log('  categoryManagement      Run category management tests', 'cyan');
    log('  all                     Run all tests', 'cyan');
    log('  report                  Generate test coverage report', 'cyan');
    log('  help                    Show this help message', 'cyan');
    log('\nOptions:', 'yellow');
    log('  --watch                 Watch mode', 'cyan');
    log('  --coverage              Generate coverage report', 'cyan');
    log('  --ui                    Open Vitest UI', 'cyan');
    log('\nExamples:', 'yellow');
    log('  node test-runner.js unit', 'cyan');
    log('  node test-runner.js auth --coverage', 'cyan');
    log('  node test-runner.js all --watch', 'cyan');
    log('  node test-runner.js report', 'cyan');
}

function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const options = {
        watch: args.includes('--watch'),
        coverage: args.includes('--coverage'),
        ui: args.includes('--ui')
    };

    if (!command || command === 'help') {
        showHelp();
        return;
    }

    if (command === 'report') {
        generateTestReport();
        return;
    }

    if (command === 'all') {
        log('\n🎯 Running All Tests...', 'bright');
        Object.keys(testConfigs).forEach(testType => {
            runTests(testType, options);
        });
        return;
    }

    runTests(command, options);
}

// Test case mapping for reference
const testCaseMapping = {
    'UT-A01': 'Login with valid credentials',
    'UT-A02': 'Login with invalid password',
    'UT-A03': 'Add new user with valid details',
    'UT-A04': 'Delete existing user',
    'UT-A05': 'Add new product',
    'UT-A06': 'Edit product details',
    'UT-A07': 'Delete an order',
    'UT-A08': 'Load dashboard',
    'UT-A09': 'Add new category',
    'UT-A10': 'Edit category details'
};

// Run main function if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export {
    runTests,
    generateTestReport,
    testConfigs,
    testCaseMapping
};
