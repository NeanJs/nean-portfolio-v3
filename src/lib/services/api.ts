import { createApi } from "@reduxjs/toolkit/query/react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase.config.js"; // Make sure to configure and export your Firestore instance

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: async ({ url }) => {
    const colRef = collection(db, url);
    const snapshot = await getDocs(colRef);
    const data = [];
    snapshot.docs.map((doc) => {
      data.push(
        url === "projects" || url === "startups"
          ? {
              _id: doc.id,
              data: doc.data(),
            }
          : doc.data()
      );
    });

    return { data };
  },
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({ url: "projects" }),
    }),
    getStartups: builder.query({
      query: () => ({ url: "startups" }),
    }),
    getUserInfo: builder.query({
      query: () => ({ url: "user" }),
    }),
  }),
});

export const { useGetProjectsQuery, useGetStartupsQuery, useGetUserInfoQuery } =
  firebaseApi;
