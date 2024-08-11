<script>
    let email = '';
    let password = '';
    let isRegister = false; // 로그인/회원가입 창 전환을 위한 상태 변수
  
    async function register() {
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        if (response.ok) {
            // Handle successful registration (e.g., redirect to login page)
        } else {
            // Handle errors (e.g., email already registered)
        }
    }

    async function login() {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        if (response.ok) {
            // Handle successful login (e.g., redirect to main page)
        } else {
            // Handle login errors (e.g., incorrect credentials)
        }
    }

    function toggleForm() {
        isRegister = !isRegister;
    }
</script>
<div class="container">
    <div class="content">    
        <form class="padding" on:submit|preventDefault={isRegister ? register : login}>
            <input type="email" bind:value={email} placeholder="Email" required />
            <input type="password" bind:value={password} placeholder="Password" required />
            <button class="button2" style="margin-top: 1em;" type="submit">
                {#if isRegister}
                    Register
                {:else}
                    Login
                {/if}
            </button>
            <div class="link-section">
                <a href="#" class="link">회원가입</a> | 
                <a href="#" class="link">아이디찾기</a> | 
                <a href="#" class="link">비밀번호찾기</a>
            </div>
        </form>

        <button class="toggle-section" on:click={toggleForm}>
            {#if isRegister}
                아이디가 생각안나세요?
            {:else}
                회원이 아니세요?
            {/if}
        </button>
    </div>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
    }

    input {
        margin-top: 1em;
        padding: 0.5em;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
        box-sizing: border-box;
    }

    .button2 {
        padding: 0.5em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #007BFF;
        color: white;
        font-size: 1em;
        width: 100%;
    }

    .button2:hover {
        background-color: #0056b3;
    }

    .link-section {
        margin-top: 1em;
        text-align: center;
        font-size: 0.9em;
        color: #007BFF;
    }

    .link-section .link {
        color: #007BFF;
        text-decoration: none;
    }

    .link-section .link:hover {
        text-decoration: underline;
    }

    .toggle-section {
        width: 100%;
        margin-top: 1em;
        text-align: center;
        font-size: 1em;
        color: #007BFF;
        cursor: pointer;
        background: none;
        border: none;
    }

    .toggle-section:hover {
        text-decoration: underline;
    }
</style>

