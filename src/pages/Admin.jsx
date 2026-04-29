import { useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageShell from '../components/PageShell.jsx'
import defaultData from '../data/data.json'
import { createSlug, getPortfolioData, resetPortfolioData, savePortfolioData } from '../utils/portfolioData.js'

const emptyProject = { title: '', description: '', link: '', image: '/assets/project-nebula.svg' }
const emptyPost = { title: '', date: new Date().toISOString().slice(0, 10), summary: '', slug: '' }

function validateData(data) {
  return data?.profile && Array.isArray(data.projects) && Array.isArray(data.blog)
}

export default function Admin() {
  const [data, setData] = useState(getPortfolioData)
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [postForm, setPostForm] = useState(emptyPost)
  const [profileForm, setProfileForm] = useState(data.profile)
  const [editingProjectIndex, setEditingProjectIndex] = useState(null)
  const [editingPostIndex, setEditingPostIndex] = useState(null)
  const [message, setMessage] = useState('')

  const formattedJson = useMemo(() => JSON.stringify(data, null, 2), [data])

  const persistData = (nextData, successMessage) => {
    setData(nextData)
    setProfileForm(nextData.profile)
    savePortfolioData(nextData)
    setMessage(successMessage)
  }

  const handleProjectSubmit = (event) => {
    event.preventDefault()
    const nextProjects = [...data.projects]
    const payload = { ...projectForm }

    if (editingProjectIndex === null) {
      nextProjects.push(payload)
    } else {
      nextProjects[editingProjectIndex] = payload
    }

    persistData({ ...data, projects: nextProjects }, 'Project berhasil disimpan.')
    setProjectForm(emptyProject)
    setEditingProjectIndex(null)
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault()
    persistData({ ...data, profile: profileForm }, 'Profile berhasil disimpan.')
  }

  const handlePostSubmit = (event) => {
    event.preventDefault()
    const nextPosts = [...data.blog]
    const payload = {
      ...postForm,
      slug: postForm.slug || createSlug(postForm.title)
    }

    if (editingPostIndex === null) {
      nextPosts.push(payload)
    } else {
      nextPosts[editingPostIndex] = payload
    }

    persistData({ ...data, blog: nextPosts }, 'Blog berhasil disimpan.')
    setPostForm(emptyPost)
    setEditingPostIndex(null)
  }

  const editProject = (index) => {
    setProjectForm(data.projects[index])
    setEditingProjectIndex(index)
  }

  const editPost = (index) => {
    setPostForm(data.blog[index])
    setEditingPostIndex(index)
  }

  const deleteProject = (index) => {
    const nextProjects = data.projects.filter((_, itemIndex) => itemIndex !== index)
    persistData({ ...data, projects: nextProjects }, 'Project berhasil dihapus.')
  }

  const deletePost = (index) => {
    const nextPosts = data.blog.filter((_, itemIndex) => itemIndex !== index)
    persistData({ ...data, blog: nextPosts }, 'Blog berhasil dihapus.')
  }

  const exportJson = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-data.json'
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Data berhasil diexport.')
  }

  const importJson = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const importedData = JSON.parse(reader.result)
        if (!validateData(importedData)) {
          setMessage('Format JSON tidak valid. Pastikan ada profile, projects, dan blog.')
          return
        }

        persistData(importedData, 'Data berhasil diimport ke localStorage.')
      } catch {
        setMessage('File JSON tidak bisa dibaca.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const resetData = () => {
    resetPortfolioData()
    setData(defaultData)
    setProfileForm(defaultData.profile)
    setMessage('Data dikembalikan ke data bawaan.')
  }

  return (
    <>
      <Seo
        title="Admin CMS | adjie Portfolio"
        description="Mini CMS lokal untuk mengelola project dan blog portfolio."
        keywords="admin portfolio, localStorage CMS, JSON editor"
        path="/admin"
      />
      <PageShell compact>
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-ion">Mini CMS</p>
          <h1 className="glow-text mt-4 text-4xl font-extrabold sm:text-5xl">Portfolio Control Room</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Kelola project dan blog secara lokal. Perubahan tersimpan di browser melalui localStorage.
          </p>
        </header>

        <section className="glass mb-8 flex flex-col gap-4 rounded-lg p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">JSON Data</h2>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">Import untuk mengganti data lokal, export untuk menyimpan hasil edit.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="cursor-pointer rounded-full border border-cyan-500/35 px-4 py-2 text-sm font-bold transition hover:border-cyan-400 dark:bg-white/5">
              Import JSON
              <input type="file" accept="application/json" onChange={importJson} className="sr-only" />
            </label>
            <button type="button" onClick={exportJson} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-ember">
              Export JSON
            </button>
            <button type="button" onClick={resetData} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-bold transition hover:border-cyan-400 dark:border-white/20">
              Reset
            </button>
          </div>
        </section>

        {message && (
          <p className="mb-8 rounded-lg border border-cyan-500/25 bg-cyan-500/10 p-4 text-sm font-semibold text-cyan-800 dark:text-ion">
            {message}
          </p>
        )}

        <section className="glass mb-8 rounded-lg p-5" aria-labelledby="profile-form-heading">
          <h2 id="profile-form-heading" className="text-2xl font-bold">Profile</h2>
          <form onSubmit={handleProfileSubmit} className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid gap-4">
              <input required value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} placeholder="Nama profile" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <input required value={profileForm.image} onChange={(event) => setProfileForm({ ...profileForm, image: event.target.value })} placeholder="/assets/nama-file.jpg" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
            </div>
            <div className="grid gap-4">
              <textarea required value={profileForm.bio} onChange={(event) => setProfileForm({ ...profileForm, bio: event.target.value })} placeholder="Bio singkat" rows="4" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <button type="submit" className="w-fit rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-ember">
                Simpan Profile
              </button>
            </div>
          </form>
        </section>

        <div className="grid gap-8 xl:grid-cols-2">
          <section className="glass rounded-lg p-5" aria-labelledby="project-form-heading">
            <h2 id="project-form-heading" className="text-2xl font-bold">{editingProjectIndex === null ? 'Tambah Project' : 'Edit Project'}</h2>
            <form onSubmit={handleProjectSubmit} className="mt-5 grid gap-4">
              <input required value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} placeholder="Judul project" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <textarea required value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} placeholder="Deskripsi project" rows="4" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <input required value={projectForm.link} onChange={(event) => setProjectForm({ ...projectForm, link: event.target.value })} placeholder="Link project" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <input required value={projectForm.image} onChange={(event) => setProjectForm({ ...projectForm, image: event.target.value })} placeholder="/assets/nama-file.jpg" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-ember">
                  {editingProjectIndex === null ? 'Tambah Project' : 'Simpan Project'}
                </button>
                {editingProjectIndex !== null && (
                  <button type="button" onClick={() => { setProjectForm(emptyProject); setEditingProjectIndex(null) }} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold dark:border-white/20">
                    Batal
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 grid gap-3">
              {data.projects.map((project, index) => (
                <article key={`${project.title}-${index}`} className="rounded-lg border border-slate-300/70 p-4 dark:border-white/15">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{project.description}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => editProject(index)} className="rounded-full border border-cyan-500/35 px-3 py-2 text-xs font-bold">Edit</button>
                    <button type="button" onClick={() => deleteProject(index)} className="rounded-full border border-rose-400/45 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-300">Hapus</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="glass rounded-lg p-5" aria-labelledby="blog-form-heading">
            <h2 id="blog-form-heading" className="text-2xl font-bold">{editingPostIndex === null ? 'Tambah Blog' : 'Edit Blog'}</h2>
            <form onSubmit={handlePostSubmit} className="mt-5 grid gap-4">
              <input required value={postForm.title} onChange={(event) => setPostForm({ ...postForm, title: event.target.value, slug: editingPostIndex === null ? createSlug(event.target.value) : postForm.slug })} placeholder="Judul blog" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <input required type="date" value={postForm.date} onChange={(event) => setPostForm({ ...postForm, date: event.target.value })} className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <input required value={postForm.slug} onChange={(event) => setPostForm({ ...postForm, slug: createSlug(event.target.value) })} placeholder="url-slug-blog" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <textarea required value={postForm.summary} onChange={(event) => setPostForm({ ...postForm, summary: event.target.value })} placeholder="Ringkasan blog" rows="4" className="rounded-lg border border-slate-300 bg-white/85 px-4 py-3 outline-none focus:border-cyan-400 dark:border-white/15 dark:bg-white/10" />
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-ember">
                  {editingPostIndex === null ? 'Tambah Blog' : 'Simpan Blog'}
                </button>
                {editingPostIndex !== null && (
                  <button type="button" onClick={() => { setPostForm(emptyPost); setEditingPostIndex(null) }} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold dark:border-white/20">
                    Batal
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 grid gap-3">
              {data.blog.map((post, index) => (
                <article key={`${post.slug}-${index}`} className="rounded-lg border border-slate-300/70 p-4 dark:border-white/15">
                  <time dateTime={post.date} className="text-xs text-cyan-700 dark:text-ion">{post.date}</time>
                  <h3 className="mt-2 font-bold">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{post.summary}</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">/{post.slug}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => editPost(index)} className="rounded-full border border-cyan-500/35 px-3 py-2 text-xs font-bold">Edit</button>
                    <button type="button" onClick={() => deletePost(index)} className="rounded-full border border-rose-400/45 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-300">Hapus</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </PageShell>
    </>
  )
}
