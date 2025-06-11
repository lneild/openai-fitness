"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FormTextField } from "./FormTextField";

interface IFormValues {
    gender: string;
    age: string;
    goals: string;
    history: string;
    equip: string;
}

export const FitnessForm = () => {
    const [gender, setGender] = useState("female");
    const [age, setAge] = useState("54");
    const [goals, setGoals] = useState("Tone up");
    const [history, setHistory] = useState(
        "Mostly cardio and eating around 1500 daily."
    );
    const [equip, setEquip] = useState(
        "No gym membership, but good climate..."
    );

    const mutation = useMutation<string, Error, IFormValues, unknown>({
        mutationFn: async (formData: IFormValues) => {
            const response = await fetch("/api/workout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const text = await response.text();
            return text.replace(/^"|"$/g, '');
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({ gender, age, goals, history, equip });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Personalized Workout Plan Generator</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-group">
                            <label className="block text-gray-200 font-medium mb-2">
                                Gender:
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200"
                                >
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>

                        <FormTextField
                            label="Age"
                            value={age}
                            onChange={setAge}
                            type="number"
                        />

                        <FormTextField
                            label="Goals"
                            value={goals}
                            onChange={setGoals}
                        />

                        <FormTextField
                            label="Exercise History"
                            value={history}
                            onChange={setHistory}
                        />

                        <FormTextField
                            label="Available Equipment/Environment"
                            value={equip}
                            onChange={setEquip}
                        />

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                        >
                            Generate Workout Plan
                        </button>
                    </form>

                    <div className="mt-6">
                        {mutation.status === "pending" && (
                            <p className="text-yellow-400 text-center">Generating your workout plan...</p>
                        )}
                        {mutation.status === "error" && (
                            <p className="text-red-400 text-center">Error: {mutation.error?.message}</p>
                        )}
                        {mutation.status === "success" && (
                            <pre className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-200 whitespace-pre-wrap">
                                {mutation.data.replaceAll("\\n", "\n")}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
