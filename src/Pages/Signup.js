import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from "react-router-dom"

const schema = Yup.object({
    firstname:Yup.string().required().trim(),
    lastname:Yup.string().required().trim(),
    email:Yup.string().email().required(),
    password:Yup.string().required().min(2).max(15)
    .matches( /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/,
            "Password should contain Capital letter,small letter and a number"),
    phone:Yup.string().required("Phone number is required").matches(/^[0-9]+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits"),
    confirmPassword: Yup.string().required("Confirm password id required")
    .oneOf([Yup.ref("password"),null], "Passwords must match"),
    gender:Yup.string().required("Please select your gender"),
    dob:Yup.date().required("Date of birth is required"),
    address:Yup.string().required("Address is required"),
    country:Yup.string().required("Country is required"),
    city:Yup.string().required("City is required"),
})

const Signup = () => {
    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [countries,setCountries] = useState([]);
    const [cities,setCities] = useState([])
    const [selectedCountry,setSelectedCountry] = useState("")
    const [loadingCities,setLoadingCities] = useState(false)
    const {handleSubmit,register, formState:{errors}, setValue} = useForm({resolver:yupResolver(schema)})

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(
                    "https://countriesnow.space/api/v0.1/countries/positions"
                );

                const countryList = response.data?.data?.map((c)=> c.name);
                setCountries(countryList)
            } catch (error) {
                toast.error("Failed to load countries")
            }
        }
        fetchCountries();
    }, []);

    useEffect (() => {
        const fetchCities = async () => {
            if (!selectedCountry) return;
            setLoadingCities(true);

            try {
                const response = await axios.post()
            }
        }
    })
}