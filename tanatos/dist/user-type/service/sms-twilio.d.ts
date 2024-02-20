export declare class SmsService {
    private readonly client;
    constructor();
    sendVerificationCode(phoneNumber: string, verificationCode: number): Promise<void>;
}
