    <!--LoginPage.svelte-->
<script lang="ts">
    import SignUp from '../components/Login/SignUp.svelte';
    import FindId from '../components/Login/FindId.svelte';
    import FindPassword from '../components/Login/FindPassword.svelte';
    import '../static/styles/Login.css'

    let email = '';
    let password = '';
    let currentForm: 'login' | 'signup' | 'findId' | 'findPassword' = 'login'; // 타입 명시

    async function login() {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('Login successful!');
        } else {
            alert('Login failed!');
        }
    }

    function showForm(form: 'login' | 'signup' | 'findId' | 'findPassword') { // 타입 명시
        currentForm = form;
    }
</script>

<div class="container">
    <div class="content">
        {#if currentForm === 'login'}
            <!-- 로그인 폼 -->
            <h2>어서오세요</h2>
            <form class="padding" on:submit|preventDefault={login}>
                <input type="email" bind:value={email} placeholder="Email" required />
                <input type="password" bind:value={password} placeholder="Password" required />
                <button class="button2" style="margin-top: 1em;" type="submit">Login</button>
            </form>
            <div class="link-section">
                <button class="button_none" on:click={() => showForm('signup')}>회원가입 </button> 
                <p>|</p>
                <button class="button_none" on:click={() => showForm('findId')}>아이디 찾기 </button> 
                <p>|</p>
                <button class="button_none" on:click={() => showForm('findPassword')}>비밀번호 찾기</button>
            </div>

        {:else if currentForm === 'signup'}
            <!-- 회원가입 폼 -->
            <SignUp />
            <button class="button3" on:click={() => showForm('login')}>뒤로</button>

        {:else if currentForm === 'findId'}
            <!-- 아이디 찾기 폼 -->
            <FindId />
            <button class="button3" on:click={() => showForm('login')}>뒤로</button>

        {:else if currentForm === 'findPassword'}
            <!-- 비밀번호 찾기 폼 -->
            <FindPassword />
            <button class="button3" on:click={() => showForm('login')}>뒤로</button>
        {/if}
    </div>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
    }

    
    .button_none {
    border: none;
    background: none;
    color: #007BFF;
    cursor: pointer;
    padding: 0;
    margin: 0;
    font-size: 1em;
    width: auto;
}

.button_none:hover {
    text-decoration: underline;
}

.link-section {
    display: flex;
    justify-content: center;
    padding: 0 2em 0 2em;
    margin-top: 0.5em;
}
.link-section p {
    background: none;
    color: #007BFF;
    font-size: 0.8em;
    padding-top: 0.3em;
}


</style>
