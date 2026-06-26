import { z } from "zod";
import i18n from "i18next";

export const LeadSchema = z.object({
  fullName: z
    .string()
    .min(3, () => i18n.t("contact.form.validation.nameMin"))
    .max(100, () => i18n.t("contact.form.validation.nameMax")),

  email: z
    .string()
    .email(() => i18n.t("contact.form.validation.emailInvalid")),

  phone: z
    .string()
    .regex(/^\+?[\d\s()-]{7,20}$/, () => i18n.t("contact.form.validation.phoneInvalid")),

  interests: z
    .array(z.string())
    .min(1, () => i18n.t("contact.form.validation.interestsMin")),

  travelDate: z
    .string()
    .optional(),

  groupSize: z
    .string()
    .min(1, () => i18n.t("contact.form.validation.groupSizeRequired")),

  message: z
    .string()
    .max(1000, () => i18n.t("contact.form.validation.messageMax"))
    .optional()
    .or(z.literal("")),

  privacyAccepted: z
    .literal(true, {
      errorMap: () => ({ message: i18n.t("contact.form.validation.privacyRequired") })
    })
});
