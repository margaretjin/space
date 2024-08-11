<!-- FindId.svelte -->
<script>
      import '../../static/styles/Login.css'
  let email = '';

  async function handleFindId() {
      const response = await fetch('http://localhost:8000/find-id', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
      });

      if (response.ok) {
          alert('아이디를 이메일로 발송했습니다!');
          // Handle successful ID retrieval
      } else {
          alert('아이디 찾기 실패!');
          // Handle errors
      }
  }
</script>

<div class="L-container">
  <h2>아이디 찾기</h2>
  <form on:submit|preventDefault={handleFindId}>
      <input type="email" bind:value={email} placeholder="이메일을 입력하세요" required />
      <button class="button" type="submit">아이디 찾기</button>
  </form>
</div>

