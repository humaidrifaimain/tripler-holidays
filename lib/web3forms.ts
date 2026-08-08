export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "51a76b5c-ac96-4318-a65c-5dccd1896fe9";

type Web3FormFields = Array<[string, string]>;

const createPayload = (subject: string, formType: string, fields: Web3FormFields) => ({
  access_key: WEB3FORMS_ACCESS_KEY,
  subject,
  from_name: "Triple R Holidays Website",
  form_type: formType,
  ...Object.fromEntries(fields.filter(([, value]) => value.trim().length > 0))
});

const postWeb3Forms = async (payload: Record<string, string>) => {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    throw new Error(data?.message ?? "Unable to submit the form. Please try again.");
  }
};

export const sendWeb3Form = async (
  subject: string,
  formType: string,
  fields: Web3FormFields
) => {
  await postWeb3Forms(createPayload(subject, formType, fields));
};

export const sendWeb3FormData = async (
  subject: string,
  formType: string,
  formData: FormData
) => {
  const fields = Array.from(formData.entries()).map(([key, value]) => [
    key,
    String(value)
  ]) as Web3FormFields;

  await postWeb3Forms(createPayload(subject, formType, fields));
};
