from jinja2 import Environment, FileSystemLoader
from xhtml2pdf import pisa
import io
import os

def generate_payslip_pdf(data: dict):
    """
    Generates a PDF payslip from a dictionary of data using a Jinja2 template.
    """
    template_html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Helvetica, Arial, sans-serif; color: #333; }}
            .header {{ text-align: center; border-bottom: 2px solid #3f51b5; padding-bottom: 10px; }}
            .company-name {{ font-size: 24px; font-bold; color: #3f51b5; }}
            .payslip-title {{ font-size: 18px; margin-top: 10px; }}
            .section {{ margin-top: 20px; }}
            .section-title {{ font-size: 14px; font-bold; background: #f5f5f5; padding: 5px; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 10px; }}
            th, td {{ text-align: left; padding: 8px; border-bottom: 1px solid #eee; }}
            .total-row {{ font-bold; background: #e8eaf6; }}
            .footer {{ margin-top: 30px; font-size: 10px; text-align: center; color: #777; }}
            .hash {{ font-family: monospace; color: #aaa; }}
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-name">AI HR MANAGER</div>
            <div class="payslip-title">PAYSLIP FOR {data['month']}</div>
        </div>

        <div class="section">
            <div class="section-title">EMPLOYEE DETAILS</div>
            <table>
                <tr><th>Name:</th><td>{data['employee_name']}</td><th>Code:</th><td>{data['employee_code']}</td></tr>
                <tr><th>Department:</th><td>{data['department']}</td><th>Designation:</th><td>{data['role']}</td></tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">EARNINGS & DEDUCTIONS</div>
            <table>
                <thead>
                    <tr><th>Description</th><th>Amount (LKR)</th></tr>
                </thead>
                <tbody>
                    <tr><td>Base Salary</td><td>{data['base_salary']:.2f}</td></tr>
                    <tr><td>Overtime ({data['overtime_hours']} hrs)</td><td>{data['overtime_pay']:.2f}</td></tr>
                    <tr><td>Bonuses / Allowances</td><td>{data['bonus']:.2f}</td></tr>
                    <tr><td>Penalties</td><td>({data['penalties']:.2f})</td></tr>
                    <tr><td>Leave Deductions</td><td>({data['leave_deductions']:.2f})</td></tr>
                    <tr class="total-row"><td><strong>NET SALARY</strong></td><td><strong>{data['net_salary']:.2f}</strong></td></tr>
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p>This is a computer-generated payslip and does not require a physical signature.</p>
            <p class="hash">Verification Hash: {data['verification_hash']}</p>
        </div>
    </body>
    </html>
    """

    result = io.BytesIO()
    pisa.CreatePDF(io.BytesIO(template_html.encode("utf-8")), dest=result)
    return result.getvalue()
