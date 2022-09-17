async function getBase() {
  let url = `${window.location.protocol}//${window.location.host}/base`
  console.debug('Server URL:', url)
  let basePromise = await fetch(url)
  let baseList = await basePromise.json()

  if (window.location.search == '?sort=name') {
    baseList.sort((a,b) => a.name.localeCompare(b.name))
  }
  else if (window.location.search == '?sort=description') {
    baseList.sort((a,b) => a.description.localeCompare(b.description))
  }
  else {
    // Default is to sort by spherical distance from the origin.
    baseList.sort((a,b) => Math.sqrt(a.x**2 + a.y**2 + a.z**2) - Math.sqrt(b.x**2 + b.y**2 + b.z**2))
  }

  let count = 0
  let baseHTML = `
    <table>
      <thead>
        <th><a href="/?sort=name" title="Sort by Name">Name</a></th>
        <th class="numeric"><a href="/?sort=distance" title="Sort by Distance">Coordinates</a></th>
        <th class="verbose"><a href="/?sort=description" title="Sort by Description">Description</a></th>
      </thead>
      <tbody>
  `
  baseList.forEach(base => {
    baseHTML += `
        <tr>
          <td>${base.name}</td>
          <td class="numeric">${base.x},${base.y},${base.z}</td>
          <td class="verbose">${base.description}</td>
        </tr>
    `
    count++
  })
  baseHTML += `
      </tbody>
    </table>
    <p>Total bases: ${count}</p>
  `
  baseElement = document.getElementById('base')
  baseElement.innerHTML = baseHTML
}
