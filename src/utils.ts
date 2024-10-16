import express from "express";

const DEFAULT_QUERY_LENGTH = 100000; // Default value for query length

/**
 * Helper function to parse the length from the query parameters.
 * If the parameter is missing, it defaults to DEFAULT_QUERY_LENGTH.
 * @param {string | undefined} lengthQuery - The length query parameter from the request.
 * @returns {number} The parsed length or default if not provided.
 */
export const parseQueryLength = (lengthQuery: string | undefined): number => {
    return parseInt(lengthQuery as string) || DEFAULT_QUERY_LENGTH;
}

/**
 * Helper function to generate an array of random numbers.
 * @param {number} length - The length of the array.
 * @returns {number[]} The generated array of random numbers.
 */
export const generateTestData = (length: number): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * length));
}

/**
 * Helper function to handle profiling routes.
 * @param {express.Response} res - The response object.
 * @param {Function} profileFunc - The profiling function (insert, delete, search).
 */
export const handleProfileRequest = (res: express.Response, profileFunc: () => void): void => {
    profileFunc();
    res.send('Profiling completed. Check console for memory and time usage.');
}