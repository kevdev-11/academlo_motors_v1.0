import bcrypt from 'bcrypt';

export const verifyPassword = async (bodyPassword, userPassword) => {
    return await bcrypt.compare(bodyPassword, userPassword)
}
export const encryptedPassword = async(password) => {
    
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)

};


