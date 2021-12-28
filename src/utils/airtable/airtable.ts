import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

export const createEmailSubscription = async (email: string) => {
  const params = [
    {
      fields: {
        email,
      },
    },
  ];

  await base("Email").create(params);
};

export { Airtable };
