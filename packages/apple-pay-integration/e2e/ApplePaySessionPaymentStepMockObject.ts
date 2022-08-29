const addApplePaySessionToChrome = () => {
    class ApplePaySessionPaymentStep implements ApplePaySession {
        version: number;
        paymentRequest: ApplePayJS.ApplePayPaymentRequest;

        static STATUS_SUCCESS = 1;
        static STATUS_FAILURE = 2;

        static supportsVersion(_versionNumber) {
            console.log('supportsVersion', _versionNumber)
            return true;
        }

        static canMakePayments() {
            return true;
        }

        static canMakePaymentsWithActiveCard() {
            return Promise.resolve(this.canMakePayments());
        }

        constructor(version, paymentRequest) {
            this.version = version;
            this.paymentRequest = paymentRequest;
        }

        oncancel: (event: ApplePayJS.Event) => void = () => { 
            console.log('oncancel');
        }

        onpaymentauthorized: (event: ApplePayJS.ApplePayPaymentAuthorizedEvent) => void = () => {
            console.log('onpaymentauthorized');
        }

        onpaymentmethodselected: (event: ApplePayJS.ApplePayPaymentMethodSelectedEvent) => void = () => {
            console.log('onpaymentmethodselected');
        }

        onshippingcontactselected: (event: ApplePayJS.ApplePayShippingContactSelectedEvent) => void = () => { 
            console.log('onshippingcontactselected');
        }

        onshippingmethodselected: (event: ApplePayJS.ApplePayShippingMethodSelectedEvent) => void  = () => { 
            console.log('onshippingmethodselected');
        }

        onvalidatemerchant: (event: ApplePayJS.ApplePayValidateMerchantEvent) => void  = () => { 
            console.log('onvalidatemerchant');
        }

        abort(): void {
            console.log('abort')
        }        
        
        completePayment() {
            console.log('completePayment');
        }

        completeShippingContactSelection(_update) {
            console.log('completeShippingContactSelection', _update);
        }

        completeShippingMethodSelection(_update) {
            console.log('completeShippingMethodSelection', _update);
        }

        completeMerchantValidation(_response) {
            console.log('completeMerchantValidation', _response);
        }

        completePaymentMethodSelection(newTotal: ApplePayJS.ApplePayLineItem, newLineItems: ApplePayJS.ApplePayLineItem[]): void;
        completePaymentMethodSelection(update: ApplePayJS.ApplePayPaymentMethodUpdate): void;

        completePaymentMethodSelection(newTotal: unknown, newLineItems?: unknown): void {
            console.log('completeMerchantValidation', newTotal, newLineItems);
        }
        begin() {
            setTimeout(() => {
                const event = {
                    validationURL: 'https://www.example.com',
                } as ApplePayJS.ApplePayValidateMerchantEvent

                this.onvalidatemerchant(event);
            }, 0);
            setTimeout(() => {
                const mockPaymentData = {
                    version: "mock_v1",
                    data: "mockData",
                    signature: "mockSignature",
                    header: {
                        ephemeralPublicKey: "mockPublicKey",
                        publicKeyHash: "mockPublicKeyHash",
                        transactionId: "mockTransactionId",
                    }
                }
                const event = {
                    payment: {
                        token: {
                            paymentData: mockPaymentData,
                            paymentMethod: {
                                displayName: 'xx',
                                network: 'xx',
                                type: 'debit',
                                paymentPass: {
                                    primaryAccountIdentifier: 'xx',
                                    primaryAccountNumberSuffix: 'xx',
                                    activationState: 'activated'
                                }
                            },
                            transactionIdentifier: "xx",
                        },
                        billingContact: {
                            emailAddress: "mock@mock.com",
                            familyName: "mock",
                            givenName: "mock",
                            phoneNumber: "00000000",
                        },
                        shippingContact: {
                            emailAddress: "mock@mock.com",
                            familyName: "mock",
                            givenName: "mock",
                            phoneNumber: "00000000",
                        }
                    },
                } as unknown as ApplePayJS.ApplePayPaymentAuthorizedEvent;

                this.onpaymentauthorized(event);
            }, 1000)
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.ApplePaySession = ApplePaySessionPaymentStep;
}

export default addApplePaySessionToChrome;
