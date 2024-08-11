<!-- FindPassword.svelte -->
<script>
      import '../../static/styles/Login.css'
  let email = '';

  async function handleFindPassword() {
      const response = await fetch('http://localhost:8000/find-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
      });

      if (response.ok) {
          alert('비밀번호 재설정 링크를 이메일로 발송했습니다!');
          // Handle successful password reset
      } else {
          alert('비밀번호 찾기 실패!');
          // Handle errors
      }
  }
</script>

<div class="L-container">
  <h2>비밀번호 찾기</h2>
  <form on:submit|preventDefault={handleFindPassword}>
      <input type="email" bind:value={email} placeholder="이메일을 입력하세요" required />
      <button class="button" type="submit">비밀번호 찾기</button>
  </form>
</div>

