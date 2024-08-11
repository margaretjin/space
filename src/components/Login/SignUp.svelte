<!-- SignUp.svelte -->
<script>
    import '../../static/styles/Login.css'

    let email = '';
    let password = '';
    let confirmPassword = '';

    async function handleRegister() {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Registration successful!');
            // Handle successful registration, e.g., redirect to login page
        } else {
            alert('Registration failed!');
            // Handle registration errors
        }
    }
</script>

<div class="L-container">
    <h2>회원가입</h2>
    <form on:submit|preventDefault={handleRegister}>
        <input type="email" bind:value={email} placeholder="Email" required />
        <input type="password" bind:value={password} placeholder="Password" required />
        <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" required />
        <button class="button" type="submit">Register</button>
    </form>
</div>
