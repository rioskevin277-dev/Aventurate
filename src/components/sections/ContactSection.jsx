import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { LeadSchema } from '../../lib/validation'
import { WHATSAPP_LINK, createInterestOptions, createGroupSizeOptions } from '../../lib/constants'
import { useFormSubmit } from '../../hooks/useFormSubmit'
import FormInput from '../ui/FormInput'
import FormSelect from '../ui/FormSelect'
import FormCheckboxGroup from '../ui/FormCheckboxGroup'
import FormTextarea from '../ui/FormTextarea'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'

export default function ContactSection() {
  const { t } = useTranslation()
  const shouldReduce = useReducedMotion()

  const INTEREST_OPTIONS = createInterestOptions(t)
  const GROUP_SIZE_OPTIONS = createGroupSizeOptions(t)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      interests: [],
      travelDate: '',
      groupSize: '',
      message: '',
      privacyAccepted: false,
    },
  })

  const { status, submitLead, reset: resetSubmit } = useFormSubmit()

  const onSubmit = async (data) => {
    const result = await submitLead(data)
    if (result.success) {
      reset()
      setTimeout(() => resetSubmit(), 6000)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-wool to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={t('contact.tag')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-moss/10 mb-6">
                <CheckCircle2 className="w-10 h-10 text-moss" />
              </div>
              <h3 className="font-display text-2xl text-bark mb-4">
                {t('contact.form.success')}
              </h3>
              <p className="text-bark-light text-lg leading-relaxed">
                {t('contact.form.successMsg')}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-3 gap-12 mt-12"
            >
              {/* Form Column */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:col-span-2 space-y-6"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput
                    label={t('contact.form.name')}
                    name="fullName"
                    type="text"
                    placeholder={t('contact.form.namePlaceholder')}
                    register={register}
                    error={errors.fullName}
                    required
                  />
                  <FormInput
                    label={t('contact.form.email')}
                    name="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    register={register}
                    error={errors.email}
                    required
                  />
                </div>

                <FormInput
                  label={t('contact.form.phone')}
                  name="phone"
                  type="tel"
                  placeholder={t('contact.form.phonePlaceholder')}
                  register={register}
                  error={errors.phone}
                  required
                />

                <FormCheckboxGroup
                  label={t('contact.form.interests')}
                  name="interests"
                  options={INTEREST_OPTIONS}
                  control={control}
                  error={errors.interests}
                  required
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput
                    label={t('contact.form.travelDate')}
                    name="travelDate"
                    type="date"
                    register={register}
                    error={errors.travelDate}
                  />
                  <FormSelect
                    label={t('contact.form.groupSize')}
                    name="groupSize"
                    options={GROUP_SIZE_OPTIONS}
                    register={register}
                    error={errors.groupSize}
                    required
                  />
                </div>

                <FormTextarea
                  label={t('contact.form.message')}
                  name="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  register={register}
                  error={errors.message}
                  rows={3}
                  maxLength={1000}
                />

                {/* Privacy Checkbox — custom styled */}
                <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyAccepted"
                      {...register('privacyAccepted')}
                      aria-describedby={errors.privacyAccepted ? 'privacyAccepted-error' : undefined}
                      className="mt-1 h-4 w-4 rounded border-earth/30 text-moss focus:ring-moss"
                    />
                  <label
                    htmlFor="privacyAccepted"
                    className="text-sm text-bark-light"
                  >
                    {t('contact.form.privacy')}
                    <a
                      href="#"
                      className="text-moss underline hover:text-moss-dark transition-colors"
                    >
                      {t('contact.form.privacyLinkText')}
                    </a>
                    {t('contact.form.privacySuffix')}
                  </label>
                </div>
                {errors.privacyAccepted && (
                  <p
                    id="privacyAccepted-error"
                    role="alert"
                    className="text-red-600 text-sm -mt-4 ml-7"
                  >
                    {errors.privacyAccepted.message}
                  </p>
                )}

                {/* Submit Error Message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>
                      {t('contact.form.errorMsg')}
                    </span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('contact.form.sending')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('contact.form.submit')}
                    </span>
                  )}
                </Button>
              </form>

              {/* WhatsApp Side Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-wool-dark sticky top-24">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg text-bark mb-2">
                    {t('contact.sidePanel.title')}
                  </h3>
                  <p className="text-bark-light text-sm mb-6 leading-relaxed">
                    {t('contact.sidePanel.body')}
                  </p>
                  <Button
                    href={WHATSAPP_LINK}
                    variant="whatsapp"
                    className="w-full"
                  >
                    {t('contact.sidePanel.cta')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
