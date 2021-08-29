import * as utils from "./utils"
// @ponicode
describe("utils.fullImageUrl", () => {
    test("0", () => {
        let callFunction: any = () => {
            utils.fullImageUrl("/path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            utils.fullImageUrl("C:\\\\path\\to\\folder\\")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            utils.fullImageUrl("path/to/folder/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            utils.fullImageUrl("C:\\\\path\\to\\file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            utils.fullImageUrl(".")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            utils.fullImageUrl("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
