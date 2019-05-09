<template>
  <div>
    <c-tab :items="[{key:'c',name:'abbb'},{key:'b',name:'中国人12'},{key:'ca',name:'中国人123'}]" vertical verticalText>
      <div slot='c'>222<div>中国人11中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12中国人12</div>
      </div>
      <div slot='b'>
        <div>243143214321432143214314321b</div>
      </div>
      <div slot='ca'>
        <div>243143214321432143214314321c</div>
      </div>
    </c-tab>
  </div>
</template>

<script>
export default {
  data: () => ({
  })
}
</script>