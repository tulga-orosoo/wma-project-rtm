
export class XUser {

    private password: String

    constructor(private firstName?: String,
        private lastName?: String,
        private email?: String,
        private phoneNumber?: String,
        private photURL?: String) { }

    getFirstName = () => this.firstName
    getLastName = () => this.lastName
    getEmail = () => this.email
    getPhoneNumber = () => this.phoneNumber
    getPhotoURL = () => this.photURL
    getPassword = () => this.password

    static Builder = class {

        user: XUser=new XUser()

        constructor() { }

        setFirstName(firstName) {
            this.user.firstName = firstName
            return this
        }
        setLastName(lastName) {
            this.user.lastName = lastName
            return this
        }
        setEmail(email) {
            this.user.email = email
            return this
        }
        setPhoneNumber(phoneNumber) {
            this.user.phoneNumber = phoneNumber
            return this
        }
        setPhoto(photURL) {
            this.user.photURL = photURL
            return this
        }
        setPassword(password) {
            this.user.password = password
            return this
        }
        build() {
            return this.user
        }

        from(jsonObject){
            this.user.firstName=jsonObject.firstName
            this.user.lastName=jsonObject.lastName
            this.user.email=jsonObject.email
            this.user.password=jsonObject.email
            this.user.phoneNumber=jsonObject.phoneNumber
            this.user.photURL=jsonObject.photoURL
            this.user.password=jsonObject.password
            return this
        }
    }

}