import { client } from '../sanityClient';

export const isBrowser = (): boolean => typeof window !== 'undefined';

export const getUser = (): User | null => {
  try {
    if (isBrowser()) {
      const user = window.localStorage.getItem('gatsbyUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user from localStorage:', error);
    return null;
  }
};

const setUser = (user: User | null): void => {
  if (isBrowser()) {
    if (user) {
      window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('gatsbyUser');
    }
  }
};

export const handleLogin = async ({
  name,
  password,
}: LoginCredentials): Promise<boolean> => {
  try {
    const query = `*[_type == "author" && name == $name && password == $password]`;
    const params = { name, password };

    const response = await client.fetch<User[]>(query, params);

    if (response.length > 0) {
      const user = response[0];
      setUser(user);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Login failed');
  }
};

export const isLoggedIn = (): boolean => {
  const user = getUser();
  return !!user?.name;
};

export const logout = (callback: () => void): void => {
  setUser(null);
  callback();
};
export const CreatePost = async (blogData: BlogData) => {
  try {
    // Create a new document in Sanity
    await client.create({
      _type: 'post',
      title: blogData.title,
      slug: {
        _type: 'slug',
        current: blogData.slug,
      },
      author: {
        _type: 'reference',
        _ref: blogData.author,
      },
      image: {
        _type: 'image',
        asset: {
          _ref: blogData.image,
        },
      },
      categories: blogData.categories?.map((category) => ({
        _type: 'reference',
        _ref: category,
      })),
      // publishedAt: new Date(blogData.publishedAt)?.toISOString(),
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: blogData.body,
            },
          ],
        },
      ],
    });
    console.log('Blog posted successfully!');
  } catch (error) {
    console.error('Error posting the blog:', error);
  }
};

interface User {
  name: string;
  email: string;
}

interface LoginCredentials {
  name: string;
  password: string;
}
interface BlogData {
  title: string;
  slug: string;
  author?: string; // Assuming the author is identified by a string ID
  image?: string; // Assuming the image is identified by a string URL
  categories?: string[]; // Assuming the categories are identified by string IDs
  publishedAt?: string; // Assuming the publishedAt is a string formatted as a date
  body?: string;
}
