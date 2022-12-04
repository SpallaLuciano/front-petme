import jwt_decode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth, Credentials, TokenDecoded } from '../../interfaces';

export const signInAuth = createAsyncThunk<
  Auth,
  Credentials,
  {
    rejectValue: string
  }
>(
  'auth/signIn',
  async (_input, { rejectWithValue }) => {
    try {
      const { data } = await Promise.resolve({ data: {
        // eslint-disable-next-line max-len
        token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2hvQGVtYWlsLmNvbSIsInVzZXIiOjEsImFkbWluIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOiIyMDIzLTEyLTMxVDIzOjU5OjU5LjAwMC0wMzowMCJ9.gaH19rl0860GwOAEtyix1uFw4yv6kRttvIeHh0zX519g5VvCwHj44gbX4KmlvyxJI85SuPkwRfTWGGPuPFElt2uPbuYLnmm11UIOn2EPsCKK272atpBeLy-fWm4znacDLjTR1ZWNYTXLqHPoM_yaDUi7se6pPIVOGDFjyrDhTtLq3Cab96dyT7_LnkqAKdu87pehbT69Ywi63K_EsZrzksLO4SLQ_tfiDRax41oGQt_4EKFfclJNjxoKPqir09J1vGVLyqgmIjUImwQpkEld0DD6PkJADZaL86e7x5s_MH5wy1ynnGTfOBV91fKT9lXtuN04zggUYlLbY6e5guB3vw',
        user: 1,
        email: 'lucho@email.com',
        admin: false,
        validToken: true
      }});

      localStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const loadAuth = createAsyncThunk<
  TokenDecoded,
  void,
  {
    rejectValue: string
  }
>(
  'auth/loadAuth',
  async(_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        return jwt_decode<TokenDecoded>(token);
      }
      throw new Error();
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const signOut = createAsyncThunk<
  boolean,
  void,
  {
    rejectValue: string
  }
>(
  'auth/signOut',
  async(_, { rejectWithValue }) => {
    try {
      return true;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
