import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./RaffleForm.module.scss";
import WhiteArrow from "@/icons/WhiteArrow";
import ThanksPopup from "../ThanksPopup/ThanksPopup";

// Оновлюємо схему валідації, додаючи поле id
const schema = yup.object().shape({
  id: yup.number().required(),
  firstName: yup.string().required("This field is required!"),
  lastName: yup.string().required("This field is required!"),
  phone: yup.string().required("This field is required!"),
  email: yup
    .string()
    .email("Invalid email")
    .required("This field is required!"),
  industry: yup.string().required("This field is required!"),
  company: yup.string(), // не обов'язкове
  websiteUrl: yup
    .string()
    .url("Invalid URL")
    .required("This field is required!"),
  currentPaymentProviders: yup.string(), // не обов'язкове
});

const RaffleForm = () => {
  const [isThanksPopupOpen, setIsThanksPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const generateUniqueId = async () => {
    let id;
    let isUnique = false;
    while (!isUnique) {
      id = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
      try {
        const res = await fetch(`/api/check-id?id=${id}`);
        const data = await res.json();
        if (data.unique) {
          isUnique = true;
        }
      } catch (error) {
        console.error("Error checking id uniqueness:", error);
        isUnique = true;
      }
    }
    setValue("id", id);
  };

  useEffect(() => {
    generateUniqueId();
  }, [setValue, reset]);

  const onSubmit = async (formData) => {
    console.log("Form data: ", formData);
    try {
      setIsLoading(true);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsThanksPopupOpen(true);
        reset();
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseThanksPopup = () => {
    setIsThanksPopupOpen(false);
    generateUniqueId();
  };

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />

          {/* First Name */}
          <div className={styles.inputWrapper}>
            <label htmlFor="firstName">First Name*</label>
            {errors.firstName && <span>{errors.firstName.message}</span>}
            <input
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName")}
              className={errors.firstName ? "invalid" : ""}
            />
          </div>

          {/* Last Name */}
          <div className={styles.inputWrapper}>
            <label htmlFor="lastName">Last Name*</label>
            {errors.lastName && <span>{errors.lastName.message}</span>}
            <input
              id="lastName"
              placeholder="Enter your last name"
              {...register("lastName")}
              className={errors.lastName ? "invalid" : ""}
            />
          </div>

          {/* Phone */}
          <div className={`${styles.inputWrapper} ${styles.wide}`}>
            <label htmlFor="phone">Phone*</label>
            {errors.phone && <span>{errors.phone.message}</span>}
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  country={"us"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    className: errors.phone ? "invalid" : "",
                  }}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Email */}
          <div className={`${styles.inputWrapper} ${styles.wide}`}>
            <label htmlFor="email">Email*</label>
            {errors.email && <span>{errors.email.message}</span>}
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={errors.email ? "invalid" : ""}
            />
          </div>

          {/* Industry */}
          <div className={`${styles.inputWrapper} ${styles.wide}`}>
            <label htmlFor="industry">Industry*</label>
            {errors.industry && <span>{errors.industry.message}</span>}
            <input
              id="industry"
              placeholder="Enter your industry"
              {...register("industry")}
              className={errors.industry ? "invalid" : ""}
            />
          </div>

          {/* Company */}
          <div className={`${styles.inputWrapper} ${styles.wide}`}>
            <label htmlFor="company">Company</label>
            <input
              id="company"
              placeholder="Enter your company"
              {...register("company")}
            />
          </div>

          {/* Website URL */}
          <div className={`${styles.inputWrapper} ${styles.wide}`}>
            <label htmlFor="websiteUrl">Website URL*</label>
            {errors.websiteUrl && <span>{errors.websiteUrl.message}</span>}
            <input
              id="websiteUrl"
              placeholder="Enter your website URL"
              {...register("websiteUrl")}
              className={errors.websiteUrl ? "invalid" : ""}
            />
          </div>

          {/* Current Payment Providers */}
          <div className={`${styles.inputWrapper} ${styles.wide}`}>
            <label htmlFor="currentPaymentProviders">
              Current Payment Providers
            </label>
            <input
              id="currentPaymentProviders"
              placeholder="Enter your current payment providers"
              {...register("currentPaymentProviders")}
            />
          </div>

          {/* Submit Button */}
          <button type="submit">
            {isLoading ? "Loading..." : "Join the Raffle"} <WhiteArrow />
          </button>
        </form>
      </div>
      <ThanksPopup
        isOpen={isThanksPopupOpen}
        onClose={() => handleCloseThanksPopup()}
      />
    </>
  );
};

export default RaffleForm;
