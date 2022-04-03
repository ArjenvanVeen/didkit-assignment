import exp from "constants";

const DIDKit = require('@spruceid/didkit');

export class CredentialsService {

    public constructor() {
        console.log('using DIDKit version: ', DIDKit.getVersion());
    };

   /* I am aware storing everything in global variables is bad practice, but this lets me send you everything in one file and execute the methods independently.
   So for the sake of this exercise I went with it.*/
   
   // Generating a key for issuing here, but you could also read your issuer key from a file.
   private key = DIDKit.generateEd25519Key();

   // Assuming we know the holder DID
   private targetDID: String = "did:key:z6Mkjo9pGYpv88SCYZW3ZT1dxrKYJrPf6u6hBeGexChJF4NN";
   private issuanceDate = new Date().toISOString();
   private did = DIDKit.keyToDID('key', this.key);
   private verificationMethod = DIDKit.keyToVerificationMethod('key', this.key);  
   private vc = {};
   private vp = {};
   private options = {
      "proofPurpose": "assertionMethod",
      "verificationMethod": this.verificationMethod
   };

   public async issueCredential(): Promise<void> {
      
      const KYCAMLCredential = {
         "credentialSubject":{
            "KYCAMLAttestation":{
               "type":"KYCAMLAttestation",
               "process":"https://verite.id/definitions/processes/kycaml/0.0.1/usa",
               "approvalDate":"2021-09-14T02:00:07.540Z"
            },
            "id": this.targetDID
         },
         "issuer":{
            "id": this.did
         },
         "type":[
            "VerifiableCredential",
            "KYCAMLAttestation"
         ],
         "@context":[
            "https://www.w3.org/2018/credentials/v1",
            {
               "@vocab":"https://verite.id/identity/"
            }
         ],
         "issuanceDate": this.issuanceDate
      }

      this.vc = DIDKit.issueCredential(KYCAMLCredential, this.options, this.key);
      console.log('Verifiable Credential: ', this.vc);
   }

   public async issuePresentation(): Promise<void> {

      await this.issueCredential();
      const unsignedPresentation = 
      {
         "@context":[
            "https://www.w3.org/2018/credentials/v1",
            {
               "@vocab":"https://verite.id/identity/"
            }
         ],
          "id": "https://www.w3.org/2018/credentials/v1",
          "type": ["VerifiablePresentation"],
          "holder": this.did,
          "verifiableCredential": this.vc
      };

      this.vp = DIDKit.issuePresentation(unsignedPresentation, this.options, this.key);
      console.log('Verifiable Presentation: ', this.vp);
   }

   public verifyCredential(): void {
      console.log('Verified Credential: ', DIDKit.verifyCredential(this.vc, this.options));
   }

   public verifyPresentation(): void {
      console.log('Verified Presentation: ', DIDKit.verifyPresentation(this.vp, this.options));
   }
}


