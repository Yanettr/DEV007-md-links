import {
  extractLinksFromFile,
  extractLinksFromDirectory,
  countLinks,
  mdLinks
} from '../src/library.js';

it('Debe lanzar un error si la ruta es inválida', () => {
  const options = {
    validate: false,
    stats: false
  };
  const invalidPath = './test/files/prueba.md';
  return expect(mdLinks(options, invalidPath)).rejects.toThrow('La ruta ingresada debe ser un archivo markdown(.md) o un directorio existente.\nRuta: C:\\laboratoria-yanet\\Git\\DEV007-md-links\\test\\files\\prueba.md');
});


describe('extractLinksFromFile', () => {
  it('Devuelve una lista de objetos con href, text, file, status y ok cuando options.validate es true', () => {
    const filePathTest = './test/files/prueba2.md';
    const validate = true;
    const expectedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './test/files/prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github fetch',
        file: './test/files/prueba2.md',
        status: 404,
        ok: 'fail'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './test/files/prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './test/files/prueba2.md',
        status: 200,
        ok: 'ok'
      }
    ];

    return extractLinksFromFile(filePathTest, validate).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });

  it('Devuelve una lista de objetos con href, text, file, status y ok cuando options.validate es false', () => {
    const filePathTest = './test/files/prueba2.md';
    const validate = false;
    const expectedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './test/files/prueba2.md'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github fetch',
        file: './test/files/prueba2.md'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './test/files/prueba2.md'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './test/files/prueba2.md'
      }
    ];

    return extractLinksFromFile(filePathTest, validate).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });
});




describe('extractLinksFromDirectory', () => {
  it('Devuelve una lista de objetos con href, text, file, status y ok cuando options.validate es true', () => {
    const folderPathTest = './test/files';
    const validate = true;
    const expectedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'test\\files\\prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github fetch',
        file: 'test\\files\\prueba2.md',
        status: 404,
        ok: 'fail'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test\\files\\prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test\\files\\prueba2.md',
        status: 200,
        ok: 'ok'
      }
    ];

    return extractLinksFromDirectory(folderPathTest, validate).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });

  it('Devuelve una lista de objetos con href, text, file, status y ok cuando options.validate es false', () => {
    const folderPathTest = './test/files';
    const validate = false;
    const expectedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'test\\files\\prueba2.md'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github fetch',
        file: 'test\\files\\prueba2.md'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test\\files\\prueba2.md'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test\\files\\prueba2.md'
      }
    ];

    return extractLinksFromDirectory(folderPathTest, validate).then(links => {
      expect(links).toEqual(expectedLinks);
    });
  });
});

describe('countLinks', () => {
  const links = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'test\\files\\prueba2.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
      text: 'Github fetch',
      file: 'test\\files\\prueba2.md',
      status: 404,
      ok: 'fail'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'test\\files\\prueba2.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'test\\files\\prueba2.md',
      status: 200,
      ok: 'ok'
    }
  ];

  it('Debe retornar un objeto con links totales, únicos y rotos', () => {
    const options = {
      validate: true,
      stats: true
    };

    const expectedStats = { total: 4, unique: 3, broken: 1 };
    expect(countLinks(links, options)).toEqual(expectedStats);
  });
});

describe('countLinks', () => {
  const links = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'test\\files\\prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github fetch',
        file: 'test\\files\\prueba2.md',
        status: 404,
        ok: 'fail'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test\\files\\prueba2.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test\\files\\prueba2.md',
        status: 200,
        ok: 'ok'
      }
    ];

  it('Debe retornar un objeto con links totales y únicos', () => {
    const options = {
      validate: false, 
      stats: true
    };

    const expectedStats = { total: 4, unique: 3 };
    expect(countLinks(links, options)).toEqual(expectedStats);
  });
});

describe('mdLinks', () => {
  it('Debe retornar un array de objetos con los links encontrados en un archivo Markdown', () => {
    const options = {
      validate: false,
      stats: false
    };
    const filePathTest = './test/files/prueba2.md';

    return mdLinks(options, filePathTest).then(links => {
      expect(links.length).toBe(4);

      expect(links[0]).toHaveProperty('href');
      expect(links[0]).toHaveProperty('text');
      expect(links[0]).toHaveProperty('file');

      expect(links[0]).not.toHaveProperty('ok');
      expect(links[0]).not.toHaveProperty('status');
    });
  });
});

describe('mdLinks', () => {
  it('Debe retornar un array de objetos con los enlaces validados (status y ok) en un archivo Markdown', () => {
    const options = {
      validate: true, // Establecer validate en true para habilitar la validación de enlaces
      stats: false
    };
    const filePathTest = './test/files/prueba2.md';

    return mdLinks(options, filePathTest).then(links => {
      expect(links.length).toBe(4);

      expect(links[0]).toHaveProperty('href');
      expect(links[0]).toHaveProperty('text');
      expect(links[0]).toHaveProperty('file');

      // Ahora, los enlaces devueltos también deben tener las propiedades 'ok' y 'status'
      expect(links[0]).toHaveProperty('ok');
      expect(links[0]).toHaveProperty('status');
    });
  });
});





