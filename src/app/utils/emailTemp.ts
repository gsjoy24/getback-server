import { ClaimStatus } from '@prisma/client';

type TResponse = {
	response: string;
	status: ClaimStatus;
};

const emailTemp = (name: string, payload: TResponse) => {
	const currentYear: number = new Date().getFullYear();
	const { response, status } = payload;

	const temp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Item Claim Status</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            padding: 20px;
        }
        .email-header {
            background-color: #007BFF;
            color: white;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .email-body {
            padding: 20px;
        }
        .email-footer {
            background-color: #f1f1f1;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #777;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .status-approved {
            color: green;
            font-weight: bold;
        }
        .status-pending {
            color: orange;
            font-weight: bold;
        }
        .status-rejected {
            color: red;
            font-weight: bold;
        }
        .extra-message, .instructions {
            margin-top: 20px;
            padding: 15px;
            border-left: 6px solid #007BFF;
            background-color: #e7f3fe;
        }
        .instructions {
            background-color: #dff0d8;
            border-left-color: #28a745;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                padding: 10px;
            }
            .email-header, .email-footer {
                padding: 10px;
            }
            .email-body {
                padding: 10px;
            }
            .extra-message, .instructions {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Item Claim Status Notification</h1>
        </div>
        <div class="email-body">
            <p>Dear ${name},</p>
            <p>We are writing to inform you about the status of your item claim. Below are the details:</p>
            <p><strong>Response Message:</strong> ${response} </p>
            <p><strong>Claim Status:</strong> <span class="status-[Claim Status]">${status}</span></p>
            <div class="extra-message">
                <p>Please note that if your claim status is PENDING, we are still reviewing your request and will update you once a decision is made. If your claim status is APPROVED, you will receive further instructions on how to proceed. If your claim status is REJECTED, please contact our support team if you have any questions or require further assistance.</p>
                <p>This decision was made by another user on our platform.</p>
            </div>
            <div class="instructions" style="display: [Display Instructions];">
                <p><strong>Instructions to Retrieve Your Item:</strong></p>
                <p>Please visit our office at [Office Address] between [Office Hours]. Make sure to bring a valid ID and a copy of this email for verification purposes.</p>
            </div>
            <p>Thank you for your patience and understanding.</p>
            <p>Sincerely,</p>
            <p>The Lost and Found Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; ${currentYear} Lost and Found. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

	return temp;
};

export default emailTemp;
