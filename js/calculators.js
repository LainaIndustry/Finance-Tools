/**
 * Loan & Finance Calculators - Calculation Engine
 * All financial formulas and calculation logic
 */

(function() {
    'use strict';

    /**
     * Calculate EMI (Equated Monthly Installment)
     * Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)
     * @param {number} principal - Loan amount
     * @param {number} rate - Annual interest rate in percentage
     * @param {number} tenure - Loan tenure in months
     * @returns {object} EMI details
     */
    window.calculateEMI = function(principal, rate, tenure) {
        // Input validation
        if (principal <= 0 || rate < 0 || tenure <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const monthlyRate = rate / 12 / 100;
        let emi;
        let totalPayment;
        let totalInterest;

        if (monthlyRate === 0) {
            emi = principal / tenure;
            totalInterest = 0;
            totalPayment = principal;
        } else {
            const power = Math.pow(1 + monthlyRate, tenure);
            emi = principal * monthlyRate * power / (power - 1);
            totalPayment = emi * tenure;
            totalInterest = totalPayment - principal;
        }

        return {
            emi: emi,
            totalPayment: totalPayment,
            totalInterest: totalInterest,
            principal: principal,
            monthlyRate: monthlyRate,
            tenure: tenure
        };
    };

    /**
     * Calculate Simple Interest
     * Formula: SI = P × R × T / 100
     * @param {number} principal - Initial amount
     * @param {number} rate - Annual interest rate in percentage
     * @param {number} time - Time in years
     * @returns {object} Simple interest details
     */
    window.calculateSimpleInterest = function(principal, rate, time) {
        if (principal <= 0 || rate < 0 || time <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const interest = (principal * rate * time) / 100;
        const totalAmount = principal + interest;

        return {
            interest: interest,
            totalAmount: totalAmount,
            principal: principal
        };
    };

    /**
     * Calculate Compound Interest
     * Formula: A = P × (1 + r/n)^(n×t)
     * @param {number} principal - Initial amount
     * @param {number} rate - Annual interest rate in percentage
     * @param {number} time - Time in years
     * @param {number} frequency - Compounding frequency per year
     * @param {number} monthlyContribution - Optional monthly addition
     * @returns {object} Compound interest details
     */
    window.calculateCompoundInterest = function(principal, rate, time, frequency = 12, monthlyContribution = 0) {
        if (principal < 0 || rate < 0 || time <= 0 || frequency <= 0) {
            return { error: 'Please enter valid values.' };
        }

        const r = rate / 100;
        let totalAmount = principal;
        let totalInvested = principal;

        // Calculate with monthly contributions
        if (monthlyContribution > 0) {
            const monthlyRate = r / 12;
            const months = time * 12;
            let futureValue = principal * Math.pow(1 + monthlyRate, months);
            if (monthlyRate > 0) {
                futureValue += monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
            } else {
                futureValue += monthlyContribution * months;
            }
            totalAmount = futureValue;
            totalInvested = principal + (monthlyContribution * months);
        } else {
            totalAmount = principal * Math.pow(1 + r / frequency, frequency * time);
            totalInvested = principal;
        }

        const totalInterest = totalAmount - totalInvested;

        return {
            totalAmount: totalAmount,
            totalInterest: totalInterest,
            totalInvested: totalInvested,
            principal: principal
        };
    };

    /**
     * Calculate SIP (Systematic Investment Plan) Returns
     * Formula: FV = P × ((1+r)^n - 1) / r × (1+r)
     * @param {number} monthlyInvestment - Monthly investment amount
     * @param {number} rate - Expected annual return in percentage
     * @param {number} tenure - Investment tenure in years
     * @returns {object} SIP returns
     */
    window.calculateSIP = function(monthlyInvestment, rate, tenure) {
        if (monthlyInvestment <= 0 || rate < 0 || tenure <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;
        let futureValue;

        if (monthlyRate === 0) {
            futureValue = monthlyInvestment * months;
        } else {
            futureValue = monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
        }

        const totalInvested = monthlyInvestment * months;
        const totalReturns = futureValue - totalInvested;

        return {
            futureValue: futureValue,
            totalInvested: totalInvested,
            totalReturns: totalReturns,
            monthlyInvestment: monthlyInvestment
        };
    };

    /**
     * Calculate Fixed Deposit (FD) Returns
     * @param {number} principal - Initial deposit
     * @param {number} rate - Annual interest rate in percentage
     * @param {number} tenure - Tenure in years
     * @param {string} compounding - 'yearly', 'half-yearly', 'quarterly', 'monthly'
     * @returns {object} FD returns
     */
    window.calculateFD = function(principal, rate, tenure, compounding = 'yearly') {
        if (principal <= 0 || rate < 0 || tenure <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const frequencies = {
            'yearly': 1,
            'half-yearly': 2,
            'quarterly': 4,
            'monthly': 12
        };

        const frequency = frequencies[compounding] || 1;
        const r = rate / 100;
        const totalAmount = principal * Math.pow(1 + r / frequency, frequency * tenure);
        const totalInterest = totalAmount - principal;

        return {
            totalAmount: totalAmount,
            totalInterest: totalInterest,
            principal: principal
        };
    };

    /**
     * Calculate Recurring Deposit (RD) Returns
     * @param {number} monthlyDeposit - Monthly deposit amount
     * @param {number} rate - Annual interest rate in percentage
     * @param {number} tenure - Tenure in years
     * @returns {object} RD returns
     */
    window.calculateRD = function(monthlyDeposit, rate, tenure) {
        if (monthlyDeposit <= 0 || rate < 0 || tenure <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const monthlyRate = rate / 12 / 100;
        const months = tenure * 12;
        let maturityValue;

        if (monthlyRate === 0) {
            maturityValue = monthlyDeposit * months;
        } else {
            maturityValue = monthlyDeposit * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
        }

        const totalDeposited = monthlyDeposit * months;
        const totalInterest = maturityValue - totalDeposited;

        return {
            maturityValue: maturityValue,
            totalDeposited: totalDeposited,
            totalInterest: totalInterest,
            monthlyDeposit: monthlyDeposit
        };
    };

    /**
     * Calculate Loan Affordability
     * @param {number} monthlyIncome - Monthly income
     * @param {number} monthlyExpenses - Monthly expenses
     * @param {number} rate - Interest rate in percentage
     * @param {number} tenure - Loan tenure in months
     * @param {number} dtiRatio - Debt-to-income ratio (default 0.4)
     * @returns {object} Loan affordability
     */
    window.calculateAffordability = function(monthlyIncome, monthlyExpenses, rate, tenure, dtiRatio = 0.4) {
        if (monthlyIncome <= 0 || monthlyExpenses < 0 || rate < 0 || tenure <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const monthlyRate = rate / 12 / 100;
        const maxMonthlyPayment = (monthlyIncome - monthlyExpenses) * dtiRatio;

        if (maxMonthlyPayment <= 0) {
            return { error: 'Your monthly surplus is insufficient for a loan.' };
        }

        let maxLoanAmount;
        if (monthlyRate === 0) {
            maxLoanAmount = maxMonthlyPayment * tenure;
        } else {
            maxLoanAmount = maxMonthlyPayment * (Math.pow(1 + monthlyRate, tenure) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, tenure));
        }

        return {
            maxLoanAmount: maxLoanAmount,
            maxMonthlyPayment: maxMonthlyPayment,
            monthlyIncome: monthlyIncome,
            monthlyExpenses: monthlyExpenses
        };
    };

    /**
     * Generate Amortization Schedule
     * @param {number} principal - Loan amount
     * @param {number} rate - Annual interest rate in percentage
     * @param {number} tenure - Loan tenure in months
     * @returns {array} Amortization schedule
     */
    window.generateAmortization = function(principal, rate, tenure) {
        if (principal <= 0 || rate < 0 || tenure <= 0) {
            return { error: 'Please enter valid positive values.' };
        }

        const monthlyRate = rate / 12 / 100;
        const result = window.calculateEMI(principal, rate, tenure);
        if (result.error) return result;

        const emi = result.emi;
        const schedule = [];
        let balance = principal;
        let totalInterest = 0;

        for (let month = 1; month <= tenure; month++) {
            const interest = balance * monthlyRate;
            const principalPaid = emi - interest;
            balance = balance - principalPaid;

            schedule.push({
                month: month,
                principal: principalPaid > 0 ? principalPaid : 0,
                interest: interest > 0 ? interest : 0,
                emi: emi,
                balance: balance > 0 ? balance : 0
            });

            totalInterest += interest;
            if (balance <= 0) break;
        }

        return {
            schedule: schedule,
            totalInterest: totalInterest,
            totalPayment: emi * schedule.length,
            actualTenure: schedule.length
        };
    };

    // ===== Utility Functions =====

    /**
     * Validate numeric input
     * @param {*} value - Input value to validate
     * @param {string} fieldName - Name of the field for error messages
     * @param {boolean} allowZero - Whether zero is allowed
     * @returns {object} Validation result
     */
    window.validateNumber = function(value, fieldName = 'Value', allowZero = false) {
        const num = parseFloat(value);
        
        if (isNaN(num) || value === '' || value === null || value === undefined) {
            return { valid: false, message: `Please enter a valid ${fieldName}.` };
        }
        
        if (!allowZero && num <= 0) {
            return { valid: false, message: `${fieldName} must be greater than zero.` };
        }
        
        if (allowZero && num < 0) {
            return { valid: false, message: `${fieldName} cannot be negative.` };
        }
        
        if (!isFinite(num)) {
            return { valid: false, message: `Please enter a valid ${fieldName}.` };
        }
        
        return { valid: true, value: num };
    };

    /**
     * Format currency with symbol
     * @param {number} amount - Amount to format
     * @param {string} symbol - Currency symbol
     * @returns {string} Formatted currency string
     */
    window.formatCurrency = function(amount, symbol = '₹') {
        if (isNaN(amount) || !isFinite(amount) || amount < 0) {
            return symbol + '0';
        }
        return symbol + amount.toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @param {number} decimals - Number of decimal places
     * @returns {string} Formatted number
     */
    window.formatNumber = function(num, decimals = 2) {
        if (isNaN(num) || !isFinite(num)) return '0';
        return num.toLocaleString('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    console.log('Calculator engine loaded successfully.');
})();
