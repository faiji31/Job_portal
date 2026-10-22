'use server'

import { ServerMutation } from "../core/server"

export const createCompany = async(newCompanyData)=>{
    return ServerMutation('/api/companies',newCompanyData)
}