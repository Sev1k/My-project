export function confirmationEmail(booking) {
  const formattedDate = new Date(booking.appointment.date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFF8F3;">
      
      <!-- Main Container -->
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header with Gradient -->
        <div style="background: linear-gradient(135deg, #F7ECE1 0%, #E8B4B8 100%); padding: 40px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">💅</div>
          <h1 style="color: #8B6F6F; margin: 0; font-size: 28px;">
            ${process.env.SALON_NAME || "Nail Salon"}
          </h1>
          <p style="color: #C89595; margin: 5px 0 0 0;">Your Beauty Destination</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Greeting -->
          <h2 style="color: #8B6F6F; margin-top: 0;">
            Hi ${booking.customerInfo.fullName}! ✨
          </h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Great news! Your appointment has been confirmed. We can't wait to pamper you!
          </p>

          <!-- Booking Details Card -->
          <div style="background-color: #F7ECE1; border-radius: 15px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #8B6F6F; margin-top: 0; border-bottom: 2px solid #E8B4B8; padding-bottom: 10px;">
              📅 Booking Details
            </h3>
            
            <!-- Details Table -->
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #8B6F6F; font-weight: bold;">Service:</td>
                <td style="padding: 12px 0; color: #666;">${
                  booking.service.serviceName
                }</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #8B6F6F; font-weight: bold;">Date:</td>
                <td style="padding: 12px 0; color: #666;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #8B6F6F; font-weight: bold;">Time:</td>
                <td style="padding: 12px 0; color: #666;">${
                  booking.appointment.time
                }</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #8B6F6F; font-weight: bold;">Duration:</td>
                <td style="padding: 12px 0; color: #666;">${
                  booking.service.serviceDuration
                }</td>
              </tr>
              <tr style="border-top: 2px solid #E8B4B8;">
                <td style="padding: 12px 0; color: #8B6F6F; font-weight: bold; font-size: 18px;">Total:</td>
                <td style="padding: 12px 0; color: #C89595; font-weight: bold; font-size: 18px;">
                  $${booking.service.servicePrice}
                </td>
              </tr>
            </table>
          </div>

          <!-- Salon Information -->
          <div style="background-color: #FFF8F3; border-left: 4px solid #E8B4B8; padding: 20px; margin: 30px 0;">
            <h3 style="color: #8B6F6F; margin-top: 0;">📍 Find Us</h3>
            <p style="color: #666; margin: 8px 0; line-height: 1.6;">
              <strong>${process.env.SALON_NAME || "Nail Salon"}</strong><br>
              ${process.env.SALON_ADDRESS || "123 Beauty Street"}<br>
              Phone: <a href="tel:${(process.env.SALON_PHONE || "").replace(
                /[^0-9]/g,
                ""
              )}" style="color: #C89595; text-decoration: none;">${
    process.env.SALON_PHONE || "(555) 123-4567"
  }</a><br>
              Email: <a href="mailto:${
                process.env.SALON_EMAIL || ""
              }" style="color: #C89595; text-decoration: none;">${
    process.env.SALON_EMAIL || "info@nailsalon.com"
  }</a>
            </p>
          </div>

          <!-- Important Notice -->
          <div style="background-color: #E8B4B8; border-radius: 10px; padding: 20px; margin: 30px 0;">
            <p style="color: #8B6F6F; margin: 0; font-size: 14px; line-height: 1.6;">
              <strong>⏰ Important:</strong> Please arrive 5-10 minutes before your appointment time.
              <br><br>
            </p>

             <p style="color: #8B6F6F; margin: 0; font-size: 14px; line-height: 1.6;">
              <strong>Click here to cancel appointment</strong> 
              <br><br>
              http://localhost:5173/booking/manage?token=${booking.manageToken}
            </p>

              <
          </div>

          <!-- Call to Action Button -->
          <div style="text-align: center; margin: 30px 0;">
            
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #8B6F6F; color: white; padding: 30px; text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">
            We're excited to see you! 💖
          </p>


         

           
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            Thank you for choosing ${process.env.SALON_NAME || "Nail Salon"}
          </p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              This is an automated confirmation email. Please do not reply.
            </p>
          </div>
        </div>

      </div>
    </body>
    </html>
  `;
}

/**
 * Generate HTML email for booking cancellation
 */
export function cancellationEmail(booking) {
  const formattedDate = new Date(booking.appointment.date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Cancelled</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFF8F3;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="background-color: #B8A5A5; padding: 40px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">📋</div>
          <h1 style="color: white; margin: 0; font-size: 28px;">Booking Cancelled</h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #8B6F6F; margin-top: 0;">Hi ${
            booking.customerInfo.fullName
          },</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Your appointment has been cancelled as requested.
          </p>

          <!-- Cancelled Booking Details -->
          <div style="background-color: #F7ECE1; border-radius: 15px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #8B6F6F; margin-top: 0;">Cancelled Appointment:</h3>
            <p style="color: #666; margin: 8px 0; line-height: 1.8;">
              <strong>Service:</strong> ${booking.service.serviceName}<br>
              <strong>Date:</strong> ${formattedDate}<br>
              <strong>Time:</strong> ${booking.appointment.time}
            </p>
          </div>

          <!-- Rebook Message -->
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; margin-bottom: 20px;">
              We'd love to see you again! Book another appointment anytime.
            </p>
            <a href="${process.env.SALON_WEBSITE || ""}" 
               style="display: inline-block; background-color: #C89595; color: white; text-decoration: none; 
                      padding: 15px 40px; border-radius: 25px; font-weight: bold; font-size: 16px;">
              Book Again
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #8B6F6F; color: white; padding: 30px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            ${process.env.SALON_NAME || "Nail Salon"} | ${
    process.env.SALON_PHONE || "(555) 123-4567"
  }
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
}
