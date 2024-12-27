const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.post('/calculate-salary', (req, res) => {
    const { hoursWorked, hourlyRate } = req.body;

    if (typeof hoursWorked !== 'number' || typeof hourlyRate !== 'number') {
        return res.status(400).json({
            error: 'Invalid input. Please provide numbers for hoursWorked and hourlyRate.'
        });
    }
    const regularHours = 40;
    const overtimeRate = 1.5;

    let regularPay = 0;
    let overtimePay = 0;

    if (hoursWorked > regularHours) {
        regularPay = regularHours * hourlyRate;
        overtimePay = (hoursWorked - regularHours) * hourlyRate * overtimeRate;
    } else {
        regularPay = hoursWorked * hourlyRate;
    }

    const totalPay = regularPay + overtimePay;

    res.json({
        hoursWorked,
        hourlyRate,
        regularPay,
        overtimePay,
        totalPay
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
