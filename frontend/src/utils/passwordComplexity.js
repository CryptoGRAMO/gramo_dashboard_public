class PasswordComplexity {

    passwordComplexity = (password, setPasswordComplexityError, passwordComplexityError) => {
        //const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        
        const lowercase = new RegExp("(.*[a-z].*)");
        const uppercase = new RegExp("(.*[A-Z].*)");
        const numeric = new RegExp("(.*[0-9].*)");
        const special = new RegExp("(.*[!@#$%^&*].*)");
        const len = new RegExp(".{8,}");

        setPasswordComplexityError({
            lowercase: lowercase.test(password),
            uppercase: uppercase.test(password),
            numeric: numeric.test(password),
            special: special.test(password),
            len: len.test(password)
        })
        
    }

    anyRequiredPasswordTrue = (passwordComplexityError) => {
        const asArray = Object.entries(passwordComplexityError);
        
        const filtered = asArray.filter(([key, value]) => value === false);
        
        return filtered.length > 0
    }
}

export default PasswordComplexity