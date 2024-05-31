import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Text, Heading } from "../../components";

export default function SendmailguestpagePage() {
  const [emailContent, setEmailContent] = useState(`Greetings,

      I'm Event_manager, the event manager at Event_name. We would be honored to invite you to speak at our event celebrating Event_description. 
      The event is scheduled for Event_date. The Event_name event is [full-day/half-day] program being curated by Organizing_club.
      Our goal is to ............... . 
      Your discussion on Event_description will be a great addition to our event. 
      We believe your voice would be a critical addition to the stage.
      
Looking forward to your response!
Best regards, 
Event_manager`);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [selectedEmails, setSelectedEmails] = useState(["amineyahya@insat.ucar.tn"]);

  const handleTextareaChange = (e) => {
    setEmailContent(e.target.value);
  };

  const handleEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const addEmail = () => {
    if (recipientEmail && !selectedEmails.includes(recipientEmail)) {
      setSelectedEmails([...selectedEmails, recipientEmail]);
      setRecipientEmail("");
    }
  };

  const handleSave = () => {
    console.log('Saved template:', emailContent);
    // Handle saving the template (e.g., send to server)
  };

  return (
    <>
      <Helmet>
        <title>Invite Guest - Send Invitations for Event Participation</title>
      </Helmet>

      {/* main content section */}
      <div className="relative h-[1080px] w-full bg-white-A700 bg-[url(/public/images/img_home_page.png)] bg-cover bg-no-repeat pb-[130px] pl-[31px] pr-[134px] pt-[23px] md:pb-5 md:pr-5 sm:p-5">
        {/* header section */}
        <div className="absolute bottom-0 left-[2%] top-0 my-auto flex h-max w-[68%] flex-col items-start gap-[22px]">
          {/* logo section */}
          <div className="relative mb-[7px] h-[50px] w-[15%] sm:w-full">
          <Img
            src="images/img_frame.svg"
            alt="image"
            className="absolute left-0 top-0 m-auto h-[45px] w-[45px]"
          />
          <Text size="lg" as="p" className="absolute bottom-[-0.51px] right-0.25 m-auto text-center lowercase">
            <a href="/">eventopia</a>
          </Text>
        </div>

          {/* email content section */}
          <div className="flex w-[90%] flex-col items-start justify-center self-end rounded-[30px] bg-blue_gray-100_7f px-[30px] pb-[121px] pt-[30px] shadow-xs md:w-full md:px-5 md:pb-5 sm:p-5">
            <Heading as="h1" className="ml-1.5 italic md:ml-0">
              Start choosing your guests
            </Heading>
            <Text className="text-shadow-ts mt-[26px] flex items-center justify-center rounded-[30px] bg-blue_gray-100 px-[35px] pb-[17px] pt-[13px] sm:px-5">
              To:&nbsp;
              <textarea
                value={recipientEmail}
                onChange={handleEmailChange}
                placeholder="Type an email"
                style={{ height: '32px', width: '800px', overflow: 'hidden' }}
              />
              <Button className="mt-2" onClick={addEmail}>
                Add Email
              </Button>
            </Text>
            
            {/* email object section */}
            <Text className="text-shadow-ts mt-[26px] flex items-center justify-center rounded-[30px] bg-blue_gray-100 px-[35px] pb-[17px] pt-[13px] sm:px-5">
              <span className="text-blue_gray-900">Object : Invitation to Join US at&nbsp;</span>
              <span className="italic text-gray_600">Event_name</span>
            </Text>

            {/* email body section */}
            <div className="mx-auto mt-[9px] flex w-full max-w-[1000px] self-stretch rounded-[30px] bg-blue_gray-100 pb-[38px] pl-[39px] pr-9 pt-[39px] shadow-xs md:p-5">
              <textarea
                className="form-control w-full mt-2 p-2 border border-gray-300 rounded"
                id="email"
                rows="8"
                value={emailContent}
                onChange={handleTextareaChange}
                style={{ height: '320px' }}
              ></textarea>
            </div>
            <Button
              size="sm"
              onClick={handleSave}
              className="mt-4"
            >Save Template</Button>
          </div>
        </div>

        {/* selected staff section */}
        <div className="absolute bottom-0 right-[5%] top-0 my-auto h-[782px] w-[0%]">
          
          <div className="absolute bottom-[0.00px] right-[0.00px] m-auto flex flex-col items-start justify-center rounded-[30px] bg-blue_gray-100_7f px-[22px] pb-[441px] pt-[55px] shadow-xs md:py-5 sm:p-5">
            <Heading as="h1" className="ml-1.5 italic md:ml-0">
              Guests
            </Heading> 
            <div className="mt-4 flex flex-col gap-4 overflow-y-auto max-h-[400px] w-full">
              {selectedEmails.map((email, index) => (
                <Text key={index} className="text-shadow-ts flex items-center justify-center rounded-[30px] bg-blue_gray-100 px-5 py-4 underline">
                  {email}
                </Text>
              ))}
          </div>

          </div>
          <Button
            size="sm"
            className="absolute bottom-[12%] right-[0%] m-auto min-w-[400px] gap-[5px] font-semibold sm:px-5"
          >
          Send mail
          </Button>
        </div>

        {/* send button section */}
        
      </div>
    </>
  );
}
