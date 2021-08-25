import * as useUserPk from "./useUserPk"
// @ponicode
describe("useUserPk.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            useUserPk.default()
        }
    
        expect(callFunction).not.toThrow()
    })
})
