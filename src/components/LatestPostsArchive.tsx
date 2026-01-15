


import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import heroConfig from '../../page-components.json';
import { useLatestPosts } from '../lib/useLatestPosts';
import '../LatestPostsArchive.css';



const LatestPostsArchive: React.FC = () => {
	// Find the hero config for the archive page
	const hero = Array.isArray(heroConfig.body)
		? heroConfig.body.find((b: any) => b.page === 'latest-posts')
		: null;

	// Posts and categories
	const posts = useLatestPosts(100);
	const [search, setSearch] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [catDropdownOpen, setCatDropdownOpen] = useState(false);
	const catDropdownRef = useRef<HTMLDivElement>(null);
	const catDropdownSummaryRef = useRef<HTMLDivElement>(null);
	const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 220 });

	// Derive unique categories from posts
	const categories = React.useMemo(() => {
		const cats: { id: string; name: string; slug: string }[] = [];
		posts.forEach(post => {
			(post.categories?.edges || []).forEach(edge => {
				if (!cats.find(c => c.id === edge.node.id)) {
					cats.push(edge.node);
				}
			});
		});
		return cats.sort((a, b) => a.name.localeCompare(b.name));
	}, [posts]);

	// Close dropdown on outside click
	useEffect(() => {
		if (!catDropdownOpen) return;
		function handleClick(e: MouseEvent) {
			if (
				catDropdownRef.current &&
				!catDropdownRef.current.contains(e.target as Node) &&
				catDropdownSummaryRef.current &&
				!catDropdownSummaryRef.current.contains(e.target as Node)
			) {
				setCatDropdownOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClick);

		// Position dropdown
		if (catDropdownSummaryRef.current) {
			const rect = catDropdownSummaryRef.current.getBoundingClientRect();
			setDropdownPos({
				top: rect.bottom + window.scrollY + 4,
				left: rect.left + window.scrollX,
				width: rect.width
			});
		}

		return () => document.removeEventListener('mousedown', handleClick);
	}, [catDropdownOpen]);

	if (!hero) {
		return null;
	}

	return (
		<section
			className="hero-root-archive"
			style={{
				minHeight: 160,
				height: 320,
				position: 'relative',
				overflow: 'hidden',
				background: hero.backgroundImage
					? `url(${hero.backgroundImage}) center/cover no-repeat, ${hero.backgroundColour || '#222'}`
					: hero.backgroundColour || '#222',
				color: '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				className="hero-content-archive"
				style={{
					position: 'relative',
					zIndex: 2,
					width: '100%',
					maxWidth: 900,
					margin: '0 auto',
					textAlign: 'center',
					background: 'rgba(0,0,0,0.35)',
					borderRadius: 16,
					padding: '2.5rem 1.5rem',
				}}
			>
				<h1 className="hero-title archive" style={{ color: '#fff', fontWeight: 400, fontSize: 40, marginBottom: 12 }}>
					{hero.title}
				</h1>
				{hero.blurb && (
					<p className="hero-desc-archive" style={{ color: '#fff', fontWeight: 300, fontSize: 20, margin: 0, marginBottom: 24 }}>
						{hero.blurb}
					</p>
				)}
				<div className="latest-posts-archive-filters-row" style={{ justifyContent: 'center', marginTop: 24 }}>
					{/* Search box */}
					<div className="latest-posts-archive-filter-group">
						<input
							type="text"
							className="latest-posts-archive-searchbox"
							placeholder="Search posts..."
							value={search}
							onChange={e => setSearch(e.target.value)}
							style={{
								padding: '0.6em 1em',
								borderRadius: 8,
								border: '1.5px solid #fff',
								fontSize: 18,
								minWidth: 220,
								background: 'rgba(255,255,255,0.13)',
								color: '#fff',
								outline: 'none',
								boxShadow: 'none',
							}}
						/>
					</div>
					{/* Category multi-select dropdown */}
					<div className="latest-posts-archive-filter-group" style={{ position: 'relative' }}>
						<div
							ref={catDropdownSummaryRef}
							className="latest-posts-archive-category-select"
							style={{
								padding: '0.6em 1em',
								borderRadius: 8,
								border: '1.5px solid #fff',
								fontSize: 18,
								minWidth: 180,
								background: 'rgba(255,255,255,0.13)',
								color: '#fff',
								outline: 'none',
								boxShadow: 'none',
								marginLeft: 12,
								cursor: 'pointer',
								userSelect: 'none',
								display: 'flex',
								alignItems: 'center',
								gap: 8,
							}}
							tabIndex={0}
							onClick={() => setCatDropdownOpen(v => !v)}
							onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setCatDropdownOpen(v => !v); }}
							aria-haspopup="listbox"
							aria-expanded={catDropdownOpen}
						>
							<span style={{ flex: 1, textAlign: 'left', color: '#fff' }}>
								{selectedCategories.length === 0
									? 'All categories'
									: `${selectedCategories.length} selected`}
							</span>
							<svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ marginLeft: 6 }}>
								<path d="M6 8L10 12L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
						{catDropdownOpen && typeof window !== 'undefined' && ReactDOM.createPortal(
							<div
								ref={catDropdownRef}
								className="latest-posts-archive-category-dropdown"
								style={{
									position: 'absolute',
									top: dropdownPos.top,
									left: dropdownPos.left,
									minWidth: dropdownPos.width,
									background: '#fff',
									color: '#222',
									borderRadius: 10,
									boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
									zIndex: 1000,
									padding: '0.5em 0',
									maxHeight: 320,
									overflowY: 'auto',
									marginTop: 0,
								}}
								tabIndex={-1}
								role="listbox"
							>
								{categories.filter(cat => cat && cat.id && cat.slug).map(cat => (
									<label
										key={cat.id}
										style={{
											display: 'flex',
											alignItems: 'center',
											padding: '0.4em 1em',
											cursor: 'pointer',
											fontSize: 17,
											userSelect: 'none',
											background: selectedCategories.includes(cat.slug) ? '#e6f2e6' : 'transparent',
										}}
									>
										<input
											type="checkbox"
											checked={selectedCategories.includes(cat.slug)}
											onChange={e => {
												setSelectedCategories(prev =>
													e.target.checked
														? [...prev, cat.slug]
														: prev.filter(s => s !== cat.slug)
												);
											}}
											style={{ marginRight: 10, background: 'transparent' }}
										/>
										{cat.name}
									</label>
								))}
							</div>,
							document.body
						)}
					</div>
					{/* Clear filters button */}
					<div className="latest-posts-archive-filter-group">
						<button
							type="button"
							onClick={() => { setSearch(''); setSelectedCategories([]); }}
							style={{
								marginLeft: 16,
								padding: '0.6em 1.2em',
								borderRadius: 8,
								border: '1.5px solid #fff',
								background: 'rgba(255,255,255,0.13)',
								color: '#fff',
								fontSize: 16,
								fontWeight: 500,
								cursor: 'pointer',
								transition: 'background 0.2s',
							}}
						>
							Clear filters
						</button>
					</div>
				</div>
				{/* Selected category tags */}
				{selectedCategories.length > 0 && (
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
						{selectedCategories.filter(slug => !!slug).map(slug => {
							const cat = categories.find(c => c.slug === slug && c.slug);
							if (!cat || !cat.slug) return null;
							return (
								<span key={cat.slug} style={{
									display: 'inline-flex',
									alignItems: 'center',
									background: '#e6f2e6',
									color: '#2d6a2d',
									borderRadius: 16,
									padding: '0.2em 0.9em 0.2em 0.7em',
									fontSize: '0.97em',
									fontWeight: 500,
									border: '1px solid #b2d8b2',
									lineHeight: 1.2,
									marginRight: 2,
								}}>
									{cat.name}
									<button
										onClick={e => {
											e.stopPropagation();
											setSelectedCategories(prev => prev.filter(s => s !== slug));
										}}
										style={{
											background: 'none',
											border: 'none',
											color: '#2d6a2d',
											marginLeft: 6,
											cursor: 'pointer',
											fontSize: '1.1em',
											lineHeight: 1,
											padding: 0,
											display: 'flex',
											alignItems: 'center',
										}}
										aria-label={`Remove ${cat.name}`}
										tabIndex={0}
									>
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<line x1="4" y1="4" x2="10" y2="10" stroke="#2d6a2d" strokeWidth="2" strokeLinecap="round" />
											<line x1="10" y1="4" x2="4" y2="10" stroke="#2d6a2d" strokeWidth="2" strokeLinecap="round" />
										</svg>
									</button>
								</span>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default LatestPostsArchive;

