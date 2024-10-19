const Job = require("../models/job");
const Company = require("../models/company");
const nodemailer = require("nodemailer");

// Post a job
exports.postJob = async (req, res) => {
  const { title, description, experienceLevel, candidateEmails, endDate } = req.body;
  console.log(req.body.candidateEmails)
  const companyId = req.company._id;

  try {
    // Create and save the job
    const job = new Job({
      title,
      description,
      experienceLevel,
      candidateEmails,
      endDate,
      company: companyId,
    });
    await job.save();

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with the service you're using
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send emails to candidates
    const emailPromises = candidateEmails.map((email) => {
      const mailOptions = {
        from: req.company.email, // Make sure the company email is valid and configured
        to: email,
        subject: `New Job: ${title}`,
        html: `<p>${description}</p><p>Experience Level: ${experienceLevel}</p><p>End Date: ${endDate}</p>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Wait for all email sending promises to resolve
    await Promise.all(emailPromises);

    res.status(201).json({ message: "Job posted and emails sent to candidates." });
  } catch (error) {
    // Handle errors
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Failed to post job or send emails", error: error.message });
  }
};

exports.listJobs = async (req, res) => {
  const companyId = req.company._id;

  try {
    // Find jobs associated with the company
    const jobs = await Job.find({ company: companyId }).populate('company', 'name email');

    // Check if jobs exist
    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found for this company." });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to retrieve jobs", error: error.message });
  }
};